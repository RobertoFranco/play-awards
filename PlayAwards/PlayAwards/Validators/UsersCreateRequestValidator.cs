namespace PlayAwards.Validators
{
    using FluentValidation;
    using Models;

    public class UsersCreateRequestValidator : AbstractValidator<UsersCreateRequest>
    {
        public UsersCreateRequestValidator()
        {
            this.RuleFor(ucr => ucr.FullName)
                .NotEmpty();

            this.RuleFor(ucr => ucr.Email)
                .EmailAddress();

            this.RuleFor(ucr => ucr.Password)
                .NotEmpty();
        }
    }
}
