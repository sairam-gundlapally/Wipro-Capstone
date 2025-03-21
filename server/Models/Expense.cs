using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackApp.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Category { get; set; } // ✅ Add required

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [Required]
        public int UserId { get; set; }
    }
}
