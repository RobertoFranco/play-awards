namespace PlayAwards.Validators;

using FluentValidation;

using Models;

public class UsersLoginRequestValidator : AbstractValidator<UsersLoginRequest>
{
    public UsersLoginRequestValidator()
    {
        this.RuleFor(ucr => ucr.Email)
            .EmailAddress();

        this.RuleFor(ucr => ucr.Password)
            .NotEmpty();
    }
}