using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackApp.Models
{
    public class Income
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; } = DateTime.UtcNow; // Default to today's date

        [Required]
        public int UserId { get; set; } // Link to authenticated user
    }
}
