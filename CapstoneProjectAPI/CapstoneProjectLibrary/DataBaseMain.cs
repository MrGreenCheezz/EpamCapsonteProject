using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProjectLibrary
{
    public class DataBaseMain : DbContext
    {
        public DbSet<ToDoBaseItem> ToDoItems { get; set; }

        public DbSet<ToDoBaseList> ToDoLists { get; set; }

        public DataBaseMain()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=CapstoneProjectDataBase;Username=postgres;Password=San94iki;Encoding=UTF8");
        }    
    }
}
