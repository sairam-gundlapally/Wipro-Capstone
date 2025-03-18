using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using FullStackApp.Models;
using FullStackApp.Data;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(ApplicationDbContext context, IConfiguration config) {
        _context = context;
        _config = config;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] User user) {
        if (_context.Users.Any(u => u.Email == user.Email))
            return BadRequest("User already exists");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
        _context.Users.Add(user);
        _context.SaveChanges();
        return Ok("User Registered");
    }
}
