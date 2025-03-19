using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using FullStackApp.Models;
using FullStackApp.Data;
using System.Linq;

namespace FullStackApp.Controllers
{
    [Route("api/income")]
    [ApiController]
    [Authorize] // Requires authentication
    public class IncomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IncomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Save or Update Income for Logged-in User
        [HttpPost]
        public IActionResult SetIncome([FromBody] Income income)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int parsedUserId))
                    return Unauthorized("Invalid User ID.");

                var existingIncome = _context.Incomes.FirstOrDefault(i => i.UserId == parsedUserId);
                if (existingIncome != null)
                {
                    existingIncome.Amount = income.Amount;
                }
                else
                {
                    income.UserId = parsedUserId;
                    _context.Incomes.Add(income);
                }

                _context.SaveChanges();
                return Ok(income);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // ✅ Fetch User's Income
        [HttpGet]
        public IActionResult GetIncome()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int parsedUserId))
                return Unauthorized("Invalid User ID.");

            var income = _context.Incomes.FirstOrDefault(i => i.UserId == parsedUserId);
            return Ok(income?.Amount ?? 0); // Return 0 if no income set
        }
    }
}
