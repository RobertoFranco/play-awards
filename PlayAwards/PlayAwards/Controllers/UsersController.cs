using Microsoft.AspNetCore.Mvc;

namespace PlayAwards.Controllers
{
    using System.Security.Claims;
    using System.Web;

    using Domain.Interfaces;

    using FluentValidation.AspNetCore;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Models;
    using Validators;

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;

        private readonly IJWTGenerator jwtGenerator;
        
        private readonly IEmailService emailService;

        public UsersController(
            UserManager<IdentityUser> userManager,
            IJWTGenerator jwtGenerator,
            IEmailService emailService)
        {
            this.userManager = userManager;
            this.jwtGenerator = jwtGenerator;
            this.emailService = emailService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(UsersCreateRequest request)
        {
            // Request Validation
            var validator = new UsersCreateRequestValidator();
            var validatorResult = await validator.ValidateAsync(request);

            if (!validatorResult.IsValid)
            {
                validatorResult.AddToModelState(this.ModelState);
                return this.BadRequest(this.ModelState);
            }

            // Create user
            var result = await this.userManager.CreateAsync(
                new IdentityUser
                {
                    UserName = request.FullName,
                    Email = request.Email
                },
                request.Password);

            if (!result.Succeeded)
            {
                foreach (var identityError in result.Errors)
                {
                    this.ModelState.AddModelError(string.Empty, identityError.Description);
                }

                return this.BadRequest(this.ModelState);
            }

            // Find user
            var user = await this.userManager.FindByEmailAsync(request.Email);

            var response = new UsersCreateRespose
            {
                Id = user.Id,
                FullName = user.UserName,
                Email = user.Email
            };

            return this.CreatedAtAction(
                nameof(this.Get),
                new { id = user.Id },
                response);
        }

        [HttpGet("{id}")]
        public Task<IActionResult> Get(string id)
        {
            // Used for post response purpose
            throw new NotImplementedException();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(UsersLoginRequest request)
        {
            // Request Validation
            var validator = new UsersLoginRequestValidator();
            var validatorResult = await validator.ValidateAsync(request);

            if (!validatorResult.IsValid)
            {
                validatorResult.AddToModelState(this.ModelState);
                return this.BadRequest(this.ModelState);
            }

            var user = await this.userManager.FindByEmailAsync(request.Email);

            var checkPwd = await this.userManager.CheckPasswordAsync(user, request.Password);

            if (user == null || !checkPwd)
            {
                return this.Unauthorized();
            }

            // Initial claims
            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Email, user.Email),
                new(ClaimTypes.GivenName, user.UserName)
            };

            var token = this.jwtGenerator.GenerateToken(authClaims);

            return this.Ok(new UsersLoginResponse { Token = token });
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> RequestResetPassword(UsersRequestResetPasswordRequest request)
        {
            // Request Validation
            var validator = new UsersRequestResetPasswordRequestValidator();
            var validatorResult = await validator.ValidateAsync(request);

            if (!validatorResult.IsValid)
            {
                validatorResult.AddToModelState(this.ModelState);
                return this.BadRequest(this.ModelState);
            }

            var user = await this.userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                // For security reasons, dont return that user not exist
                return this.Ok();
            }

            var token = await this.userManager.GeneratePasswordResetTokenAsync(user);
            
            // URL Encode token
            token = HttpUtility.UrlEncode(token);

            // Send email with reset password instructions
            await this.emailService.SendAsync(
                user.Email,
                "PlayAwards: Reset Password",
                @$"<p>Hello,</p>
<p>To reset your Play Awards password, click this <a href='https://playawards.azurewebsites.net/reset-password/{token}'>link</a>.</p>
<p>If you did not make this request, you can ignore this email.</p>
<p>Sincerely,</p>
<p>Play Awards</p>");

            return this.Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ResetPassword(UsersResetPasswordRequest request)
        {
            // Request Validation
            var validator = new UsersResetPasswordRequestValidator();
            var validatorResult = await validator.ValidateAsync(request);

            if (!validatorResult.IsValid)
            {
                validatorResult.AddToModelState(this.ModelState);
                return this.BadRequest(this.ModelState);
            }

            var user = await this.userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return this.UnprocessableEntity();
            }

            var result = await this.userManager
                .ResetPasswordAsync(user, request.Token, request.NewPassword);

            if (!result.Succeeded)
            {
                return this.BadRequest(result.Errors.First().Description);
            }

            return this.Ok();
        }
    }
}