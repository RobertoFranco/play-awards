namespace PlayAwards.Validators;

using FluentValidation;

using Models;

public class UsersResetPasswordRequestValidator : AbstractValidator<UsersResetPasswordRequest>
{
    public UsersResetPasswordRequestValidator()
    {
        this.RuleFor(urpr => urpr.Email)
            .EmailAddress();
        
        this.RuleFor(urpr => urpr.NewPassword)
            .NotEmpty();
        
        this.RuleFor(urpr => urpr.Token)
            .NotEmpty();
    }
}