namespace API.DTOs
{
    public class UserDto
    {
        // Identity
        public string UserName { get; set; }
        public string DisplayName { get; set; }

        // Authentication
        public string Token { get; set; }

        // Additional info
        public string Image { get; set; }
    }
}