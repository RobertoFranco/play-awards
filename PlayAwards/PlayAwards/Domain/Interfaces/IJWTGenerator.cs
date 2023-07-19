namespace PlayAwards.Domain.Interfaces
{
    using System.Security.Claims;

    public interface IJWTGenerator
    {
        string GenerateToken(IEnumerable<Claim> claims);
    }
}
