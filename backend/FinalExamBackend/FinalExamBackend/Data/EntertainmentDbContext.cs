using Microsoft.EntityFrameworkCore;

namespace FinalExamBackend.Data;

public class EntertainmentDbContext : DbContext
{
    public EntertainmentDbContext(DbContextOptions<EntertainmentDbContext> options)
        : base(options)
    {
    }
}