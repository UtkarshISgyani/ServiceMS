namespace Backend.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }
        public UserType UserType { get; set; } = UserType.NONE;
        public AccountStatus AccountStatus { get; set; } = AccountStatus.UNAPROOVED;
    }
    public enum UserType
    {
        NONE, ADMIN, CUSTOMER
    }
    public enum AccountStatus
    {
        UNAPROOVED, ACTIVE, BLOCKED
    }
    public class ServiceCategory
    {
        public int Id { get; set; }
        public string Category { get; set; } = string.Empty;
        public string SubCategory { get; set; } = string.Empty;
    }
    public class Service
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ServiceType { get; set; } = string.Empty;
        public float Price { get; set; }
        public bool Ordered { get; set; }
        public int ServiceCategoryId { get; set; }

        public ServiceCategory? ServiceCategory { get; set; }
    }
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ServiceId { get; set; }
        public DateTime OrderDate { get; set; }
        public bool Completed { get; set; }
        public DateTime? CompleteDate { get; set; }
        public int Payment { get; set; }

        public User? User { get; set; }
        public Service? Service { get; set; }
    }
}
