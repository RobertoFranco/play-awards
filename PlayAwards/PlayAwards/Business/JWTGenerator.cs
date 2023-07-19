namespace PlayAwards.Business
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    using Domain.Interfaces;

    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class JWTGenerator : IJWTGenerator
    {
        private readonly JwtGeneratorOptions options;

        public JWTGenerator(IOptions<JwtGeneratorOptions> options)
        {
            this.options = options.Value;
        }

        public string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.options.Secret));

            var token = new JwtSecurityToken(
                this.options.Issuer,
                this.options.Audience,
                expires: DateTime.UtcNow.AddMinutes(this.options.ExpirationMin),
                claims: claims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
