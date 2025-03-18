using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FullStackApp.Models;
using FullStackApp.Data;
using System.Linq;

[Route("api/expenses")]
[ApiController]
[Authorize]
public class ExpenseController : ControllerBase {
    private readonly ApplicationDbContext _context;

    public ExpenseController(ApplicationDbContext context) {
        _context = context;
    }

    [HttpPost]
    public IActionResult AddExpense([FromBody] Expense expense) {
        _context.Expenses.Add(expense);
        _context.SaveChanges();
        return Ok(expense);
    }

    [HttpGet]
    public IActionResult GetExpenses() {
        return Ok(_context.Expenses.ToList());
    }
}
