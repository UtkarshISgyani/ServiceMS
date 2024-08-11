using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        public ServiceController(Context context, EmailService emailService, JwtService jwtService)
        {
            Context = context;
            EmailService = emailService;
            JwtService = jwtService;
        }

        public Context Context { get; }
        public EmailService EmailService { get; }
        public JwtService JwtService { get; }

        [HttpPost("Register")]
        public ActionResult Register(User user)
        {
            user.AccountStatus = AccountStatus.UNAPROOVED;
            user.UserType = UserType.CUSTOMER;
            user.CreatedOn = DateTime.Now;

            Context.Users.Add(user);
            Context.SaveChanges();

            const string subject = "Account Created";
            var body = $"""
                <html>
                    <body>
                        <h1>Hello, {user.FirstName} {user.LastName}</h1>
                        <h2>
                            Your account has been created and we have sent approval request to admin. 
                            Once the request is approved by admin you will receive email, and you will be
                            able to login in to your account.
                        </h2>
                        <h3>Thanks</h3>
                    </body>
                </html>
            """;

            EmailService.SendEmail(user.Email, subject, body);

            return Ok(@"Thank you for registering. 
                        Your account has been sent for aprooval. 
                        Once it is aprooved, you will get an email.");
        }

        [HttpGet("Login")]
        public ActionResult Login(string email, string password)
        {
            if (Context.Users.Any(u => u.Email.Equals(email) && u.Password.Equals(password)))
            {
                var user = Context.Users.Single(user => user.Email.Equals(email) && user.Password.Equals(password));

                if (user.AccountStatus == AccountStatus.UNAPROOVED)
                {
                    return Ok("unapproved");
                }

                if (user.AccountStatus == AccountStatus.BLOCKED)
                {
                    return Ok("blocked");
                }

                return Ok(JwtService.GenerateToken(user));
            }
            return Ok("not found");
        }

        [Authorize]
        [HttpGet("GetServices")]
        public ActionResult GetServices()
        {
            if (Context.Services.Any())
            {
                return Ok(Context.Services.Include(b => b.ServiceCategory).ToList());
            }
            return NotFound();
        }

        [Authorize]
        [HttpPost("OrderService")]
        public ActionResult OrderService(int userId, int serviceId)
        {
            var canOrder = Context.Orders.Count(o => o.UserId == userId && !o.Completed) < 27;

            if (canOrder)
            {
                var cost = Context.Services.Single(o => o.Id == serviceId);
                var money = cost.Price;
                Context.Orders.Add(new()
                {
                    UserId = userId,
                    ServiceId = serviceId,
                    OrderDate = DateTime.Now,
                    CompleteDate = null,
                    Completed = false,
                    Payment = (int)money
                });

                var service = Context.Services.Find(serviceId);
                if (service is not null)
                {
                    service.Ordered = true;
                }


                Context.SaveChanges();
                return Ok("ordered");
            }

            return Ok("cannot order");
        }

        [Authorize]
        [HttpGet("GetOrdersOFUser")]
        public ActionResult GetOrdersOFUser(int userId)
        {
            var orders = Context.Orders
                .Include(o => o.Service)
                .Include(o => o.User)
                .Where(o => o.UserId == userId)
                .ToList();
            if (orders.Any())
            {
                return Ok(orders);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("AddCategory")]
        [Authorize]
        public ActionResult AddCategory(ServiceCategory serviceCategory)
        {
            var exists = Context.ServiceCategories.Any(bc => bc.Category == serviceCategory.Category && bc.SubCategory == serviceCategory.SubCategory);
            if (exists)
            {
                return Ok("cannot insert");
            }
            else
            {
                Context.ServiceCategories.Add(new()
                {
                    Category = serviceCategory.Category,
                    SubCategory = serviceCategory.SubCategory
                });
                Context.SaveChanges();
                return Ok("INSERTED");
            }
        }

        [Authorize]
        [HttpGet("GetCategories")]
        public ActionResult GetCategories()
        {
            var categories = Context.ServiceCategories.ToList();
            if (categories.Any())
            {
                return Ok(categories);
            }
            return NotFound();
        }

        [Authorize]
        [HttpPost("AddService")]
        public ActionResult AddService(Service service)
        {
            service.ServiceCategory = null;
            Context.Services.Add(service);
            Context.SaveChanges();
            return Ok("inserted");
        }

        [Authorize]
        [HttpDelete("DeleteService")]
        public ActionResult DeleteService(int id)
        {
            var exists = Context.Services.Any(b => b.Id == id);
            if (exists)
            {
                var service = Context.Services.Find(id);
                Context.Services.Remove(service!);
                Context.SaveChanges();
                return Ok("deleted");
            }
            return NotFound();
        }

        [HttpGet("CompleteService")]
        public ActionResult CompleteService(int userId, int serviceId, int cost)
        {
            var order = Context.Orders.SingleOrDefault(o => o.UserId == userId && o.ServiceId == serviceId);
            if (order is not null)
            {
                order.Completed = true;
                order.CompleteDate = DateTime.Now;
                order.Payment = cost;

                var service = Context. Services.Single(b => b.Id == order.ServiceId);
                service.Ordered = false;

                Context.SaveChanges();

                return Ok("returned");
            }
            return Ok("not returned");
        }

        [Authorize]
        [HttpGet("GetUsers")]
        public ActionResult GetUsers()
        {
            return Ok(Context.Users.ToList());
        }

        [Authorize]
        [HttpGet("ApproveRequest")]
        public ActionResult ApproveRequest(int userId)
        {
            var user = Context.Users.Find(userId);

            if (user is not null)
            {
                if (user.AccountStatus == AccountStatus.UNAPROOVED)
                {
                    user.AccountStatus = AccountStatus.ACTIVE;
                    Context.SaveChanges();

                    EmailService.SendEmail(user.Email, "Account Approved", $"""
                        <html>
                            <body>
                                <h2>Hi, {user.FirstName} {user.LastName}</h2>
                                <h3>You Account has been approved by admin.</h3>
                                <h3>Now you can login to your account.</h3>
                            </body>
                        </html>
                    """);

                    return Ok("approved");
                }
            }

            return Ok("not approved");
        }

        [Authorize]
        [HttpGet("GetOrders")]
        public ActionResult GetOrders()
        {
            var orders = Context.Orders.Include(o => o.User).Include(o => o.Service).ToList();
            if (orders.Any())
            {
                return Ok(orders);
            }
            else
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpGet("SendEmailForPendingServices")]
        public ActionResult SendEmailForPendingServices()
        {
            var orders = Context.Orders
                            .Include(o => o.Service)
                            .Include(o => o.User)
                            .Where(o => !o.Completed)
                            .ToList();

           
            orders.ForEach(x =>
            {
                var body = $"""
                <html>
                    <body>
                        <h2>Hi, {x.User?.FirstName} {x.User?.LastName}</h2>
                        <h4>Your service request for: "{x.Service?.ServiceType}".</h4>
                        <h4>is in action.</h4>
                        <h4>It will be  soon  completed.</h4>
                        <h4>Thanks</h4>
                    </body>
                </html>
                """;

                EmailService.SendEmail(x.User!.Email, "Pending Service", body);
            });    

            return Ok("sent");
        }

        [Authorize]
        [HttpGet("BlockUsers")]
        public ActionResult BlockUsers(int userId)
        {
            var user = Context.Users.SingleOrDefault(u => u.Id == userId);

            if (user is not null && user.AccountStatus==AccountStatus.ACTIVE)
            {
                user.AccountStatus = AccountStatus.BLOCKED;
                
                Context.SaveChanges();

                return Ok("blocked");
            }
            return Ok("not blocked");
        }

        [Authorize]
        [HttpGet("Unblock")]
        public ActionResult Unblock(int userId)
        {
            var user = Context.Users.Find(userId);
            if (user is not null)
            {
                user.AccountStatus = AccountStatus.ACTIVE;
                Context.SaveChanges();
                return Ok("unblocked");
            }

            return Ok("not unblocked");
        }
    }



}
