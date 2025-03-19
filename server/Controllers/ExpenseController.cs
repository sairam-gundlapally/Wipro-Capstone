using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using FullStackApp.Models;
using FullStackApp.Data;
using System.Linq;

namespace FullStackApp.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    [Authorize] // Requires authentication
    public class ExpenseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExpenseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Save Expense with Correct UserId
        [HttpPost]
        public IActionResult AddExpense([FromBody] Expense expense)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized("User ID not found in token.");

                // ✅ Convert UserId to int
                if (!int.TryParse(userId, out int parsedUserId))
                    return BadRequest("Invalid User ID format.");

                expense.UserId = parsedUserId; // ✅ Store expense for logged-in user
                _context.Expenses.Add(expense);
                _context.SaveChanges();

                return Ok(expense);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // ✅ Fetch Expenses for the Logged-in User
       [HttpGet]
       public IActionResult GetExpenses()
        {
           var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
           if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int parsedUserId))
           return Unauthorized("Invalid User ID.");
            var expenses = _context.Expenses.Where(e => e.UserId == parsedUserId).ToList();
            return Ok(expenses);
        }
        [HttpDelete("{id}")]
public IActionResult DeleteExpense(int id)
{
    try
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized("User ID not found.");

        if (!int.TryParse(userId, out int parsedUserId)) return BadRequest("Invalid User ID.");

        var expense = _context.Expenses.FirstOrDefault(e => e.Id == id && e.UserId == parsedUserId);
        if (expense == null) return NotFound("Expense not found.");

        _context.Expenses.Remove(expense);
        _context.SaveChanges();
        return NoContent(); // ✅ Success
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Error deleting expense: {ex.Message}");
    }
}
    }
}

