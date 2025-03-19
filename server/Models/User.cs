using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required] 
        public required string Name { get; set; } // ✅ Add required

        [Required]
        public required string Email { get; set; } // ✅ Add required

        [Required]
        public required string PasswordHash { get; set; } // ✅ Add required
    }
}
