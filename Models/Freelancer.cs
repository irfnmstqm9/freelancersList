using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Freelancers.Models
{
    public class Freelancer
    {
        [Key] // Primary Key
        public int Id { get; set; }

        [Required]
        [JsonPropertyName("username")]
        public string Username { get; set; }

        [Required, EmailAddress]
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [Required]
        [JsonPropertyName("phoneNumber")]
        public string PhoneNumber { get; set; }

        [JsonPropertyName("skillsets")]
        public string Skillsets { get; set; }

        [JsonPropertyName("hobby")]
        public string Hobby { get; set; }
    }
}
