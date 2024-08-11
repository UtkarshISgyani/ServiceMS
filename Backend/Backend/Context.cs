using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<ServiceCategory> ServiceCategories { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Order> Orders { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User()
            {
                Id = 1,
                FirstName = "Admin",
                LastName = "",
                Email = "admin@gmail.com",
                MobileNumber = "1234567890",
                AccountStatus = AccountStatus.ACTIVE,
                UserType = UserType.ADMIN,
                Password = "admin2000",
                CreatedOn = new DateTime(2024, 07, 22, 13, 28, 12)
            });

            modelBuilder.Entity<ServiceCategory>().HasData(
                new ServiceCategory { Id = 1, Category = "Periodic Maintenance Service", SubCategory = "Body Shop" },
                new ServiceCategory { Id = 2, Category = "Periodic Maintenance Service", SubCategory = "Detailing" },
                new ServiceCategory { Id = 3, Category = "Periodic Maintenance Service", SubCategory = "Common Repairs" },
                new ServiceCategory { Id = 4, Category = "Periodic Maintenance Service", SubCategory = "Scanning and Diagnostics" },
                new ServiceCategory { Id = 5, Category = "Periodic Maintenance Service", SubCategory = "Value Added Services" });

            modelBuilder.Entity<Service>().HasData(
            new Service { Id = 1, ServiceCategoryId = 1, Ordered = false, Price = 1000, ServiceType = "Dent and Repair", Title = "Body Shop" },
            new Service { Id = 2, ServiceCategoryId = 1, Ordered = false, Price = 1000, ServiceType = "Bumper Repair", Title = "Body Shop" },
            new Service { Id = 3, ServiceCategoryId = 1, Ordered = false, Price = 1000, ServiceType = "Accidental Repair", Title = "Body Shop" },
            new Service { Id = 4, ServiceCategoryId = 1, Ordered = false, Price = 1000, ServiceType = "Scratch Removal", Title = "Body Shop" },
            new Service { Id = 5, ServiceCategoryId = 2, Ordered = false, Price = 1000, ServiceType = "9H Ceramic Coating", Title = "Detailing" },
            new Service { Id = 6, ServiceCategoryId = 2, Ordered = false, Price = 1000, ServiceType = "Rubbing", Title = "Detailing" },
            new Service { Id = 7, ServiceCategoryId = 2, Ordered = false, Price = 1000, ServiceType = "Waxing", Title = "Detailing" },
            new Service { Id = 8, ServiceCategoryId = 2, Ordered = false, Price = 1000, ServiceType = "Polishing", Title = "Detailing" },
            new Service { Id = 9, ServiceCategoryId = 2, Ordered = false, Price = 1000, ServiceType = "Deep Interior Cleaning", Title = "Detailing" },

            new Service { Id = 10, ServiceCategoryId = 2, Ordered = false, Price = 1000, ServiceType = "Exterior Cleaning", Title = "Detailing" },
            new Service { Id = 12, ServiceCategoryId = 2, Ordered = false, Price = 1000, ServiceType = "Paint Enchancement", Title = "Detailing" },
            new Service { Id = 13, ServiceCategoryId = 2, Ordered = false, Price = 1000, ServiceType = "Windshield Coating", Title = "Detailing" },
            new Service { Id = 14, ServiceCategoryId = 3, Ordered = false, Price = 1000, ServiceType = "Engine Repairs", Title = "Common Repairs" },
            new Service { Id = 15, ServiceCategoryId = 3, Ordered = false, Price = 1000, ServiceType = "Brake Repairs", Title = "Common Repairs" },
            new Service { Id = 16, ServiceCategoryId = 3, Ordered = false, Price = 1000, ServiceType = "Suspension Repairs", Title = "Common Repairs" },
            new Service { Id = 17, ServiceCategoryId = 3, Ordered = false, Price = 1000, ServiceType = "AC Repair", Title = "Common Repairs" },
            new Service { Id = 18, ServiceCategoryId = 3, Ordered = false, Price = 1000, ServiceType = "Transmission and Clutch Repairs", Title = "Common Repairs" },
            new Service { Id = 19, ServiceCategoryId = 3, Ordered = false, Price = 1000, ServiceType = "Electrical Repairs", Title = "Common Repairs" },
            new Service { Id = 20, ServiceCategoryId = 4, Ordered = false, Price = 1000, ServiceType = "Troubleshooting", Title = "Scanning and Diagnostics" },
            new Service { Id = 21, ServiceCategoryId = 4, Ordered = false, Price = 1000, ServiceType = "System Errors", Title = "Scanning and Diagnostics" },
            new Service { Id = 22, ServiceCategoryId = 4, Ordered = false, Price = 1000, ServiceType = "79 Point Inspection", Title = "Scanning and Diagnostics" },

            new Service { Id = 23, ServiceCategoryId = 5, Ordered = false, Price = 1000, ServiceType = "Battery Replacement", Title = "Value Added Services" },
            new Service { Id = 24, ServiceCategoryId = 5, Ordered = false, Price = 1000, ServiceType = "Tyre Replacement", Title = "Value Added Services" },
            new Service { Id = 25, ServiceCategoryId = 5, Ordered = false, Price = 1000, ServiceType = "Insurance Renewal", Title = "Value Added Services" },
            new Service { Id = 26, ServiceCategoryId = 5, Ordered = false, Price = 1000, ServiceType = "Customization", Title = "Value Added Services" },
            new Service { Id = 27, ServiceCategoryId = 5, Ordered = false, Price = 1000, ServiceType = "Car Accessories", Title = "Value Added Services" },
            new Service { Id = 28, ServiceCategoryId = 5, Ordered = false, Price = 1000, ServiceType = "Pre-owned Cars", Title = "Value Added Services" });
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<UserType>().HaveConversion<string>();
            configurationBuilder.Properties<AccountStatus>().HaveConversion<string>();
        } 
    }
}
