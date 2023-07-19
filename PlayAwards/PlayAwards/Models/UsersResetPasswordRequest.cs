namespace PlayAwards.Models;

public class UsersResetPasswordRequest
{
    public string Email { get; set; }
    
    public string Token { get; set; }
    
    public string NewPassword { get; set; }
}