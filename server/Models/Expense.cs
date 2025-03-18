namespace FullStackApp.Models
{
public class Expense
{
    public int Id { get; set; }
    public required string Category { get; set; } 
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int UserId { get; set; }
}
}