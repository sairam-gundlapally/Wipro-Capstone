
using Microsoft.EntityFrameworkCore;
using FullStackApp.Models;

namespace FullStackApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Income> Incomes { get; set; } // ✅ Income Table
    }
}
