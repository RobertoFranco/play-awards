namespace PlayAwards.Business
{
    using Azure;
    using Azure.Communication.Email;

    using Domain.Interfaces;

    using Microsoft.Extensions.Options;

    public class AzureEmailService : IEmailService
    {
        private readonly AzureEmailOptions options;
        
        private readonly EmailClient client;

        public AzureEmailService(IOptions<AzureEmailOptions> options)
        {
            this.options = options.Value;
            this.client = new EmailClient(this.options.ConnectionString);
        }

        public async Task SendAsync(string to, string subject, string htmlContent)
        {
            var msg = new EmailMessage(
                this.options.Sender,
                to,
                new EmailContent(subject) { Html = htmlContent });

            await this.client.SendAsync(WaitUntil.Started, msg);
        }
    }
}
