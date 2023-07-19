namespace PlayAwards.Business
{
    public class JwtGeneratorOptions
    {
        public string Audience { get; set; }
        
        public string Issuer { get; set; }
        
        public string Secret { get; set; }
        
        public int ExpirationMin { get; set; }
    }
}
