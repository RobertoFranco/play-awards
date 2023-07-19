namespace PlayAwards.Validators;

using FluentValidation;

using Models;

public class UsersRequestResetPasswordRequestValidator : AbstractValidator<UsersRequestResetPasswordRequest>
{
    public UsersRequestResetPasswordRequestValidator()
    {
        this.RuleFor(rrpr => rrpr.Email)
            .EmailAddress();
    }
}