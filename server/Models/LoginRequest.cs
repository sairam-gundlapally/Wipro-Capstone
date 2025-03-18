namespace FullStackApp.Models
{
    public class LoginRequest
    {
        public required string Email { get; set; }  // ✅ Ensure non-nullable
        public required string Password { get; set; }  // ✅ Ensure non-nullable
    }
}
