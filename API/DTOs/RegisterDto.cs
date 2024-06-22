using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        // Identity
        [Required]
        public string UserName { get; set; }
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        // Security
        [Required]
        [RegularExpression(@"(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,80}$", ErrorMessage = "Password must be complex.")]
        public string Password { get; set; }
    }
}