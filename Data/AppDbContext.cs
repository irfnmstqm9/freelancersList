using Freelancers.Models;
using Microsoft.EntityFrameworkCore;

namespace Freelancers.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Freelancer> Freelancers { get; set; }
    }
}
