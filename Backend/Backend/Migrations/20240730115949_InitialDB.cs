using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 

namespace Backend.Migrations
{
    
    public partial class InitialDB : Migration
    {
    
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubCategory = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobileNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ServiceType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Ordered = table.Column<bool>(type: "bit", nullable: false),
                    ServiceCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_ServiceCategories_ServiceCategoryId",
                        column: x => x.ServiceCategoryId,
                        principalTable: "ServiceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Completed = table.Column<bool>(type: "bit", nullable: false),
                    CompleteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Payment = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ServiceCategories",
                columns: new[] { "Id", "Category", "SubCategory" },
                values: new object[,]
                {
                    { 1, "Periodic Maintenance Service", "Body Shop" },
                    { 2, "Periodic Maintenance Service", "Detailing" },
                    { 3, "Periodic Maintenance Service", "Common Repairs" },
                    { 4, "Periodic Maintenance Service", "Scanning and Diagnostics" },
                    { 5, "Periodic Maintenance Service", "Value Added Services" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccountStatus", "CreatedOn", "Email", "FirstName", "LastName", "MobileNumber", "Password", "UserType" },
                values: new object[] { 1, "ACTIVE", new DateTime(2024, 7, 22, 13, 28, 12, 0, DateTimeKind.Unspecified), "admin@gmail.com", "Admin", "", "1234567890", "admin2000", "ADMIN" });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Ordered", "Price", "ServiceCategoryId", "ServiceType", "Title" },
                values: new object[,]
                {
                    { 1, false, 1000f, 1, "Dent and Repair", "Body Shop" },
                    { 2, false, 1000f, 1, "Bumper Repair", "Body Shop" },
                    { 3, false, 1000f, 1, "Accidental Repair", "Body Shop" },
                    { 4, false, 1000f, 1, "Scratch Removal", "Body Shop" },
                    { 5, false, 1000f, 2, "9H Ceramic Coating", "Detailing" },
                    { 6, false, 1000f, 2, "Rubbing", "Detailing" },
                    { 7, false, 1000f, 2, "Waxing", "Detailing" },
                    { 8, false, 1000f, 2, "Polishing", "Detailing" },
                    { 9, false, 1000f, 2, "Deep Interior Cleaning", "Detailing" },
                    { 10, false, 1000f, 2, "Exterior Cleaning", "Detailing" },
                    { 12, false, 1000f, 2, "Paint Enchancement", "Detailing" },
                    { 13, false, 1000f, 2, "Windshield Coating", "Detailing" },
                    { 14, false, 1000f, 3, "Engine Repairs", "Common Repairs" },
                    { 15, false, 1000f, 3, "Brake Repairs", "Common Repairs" },
                    { 16, false, 1000f, 3, "Suspension Repairs", "Common Repairs" },
                    { 17, false, 1000f, 3, "AC Repair", "Common Repairs" },
                    { 18, false, 1000f, 3, "Transmission and Clutch Repairs", "Common Repairs" },
                    { 19, false, 1000f, 3, "Electrical Repairs", "Common Repairs" },
                    { 20, false, 1000f, 4, "Troubleshooting", "Scanning and Diagnostics" },
                    { 21, false, 1000f, 4, "System Errors", "Scanning and Diagnostics" },
                    { 22, false, 1000f, 4, "79 Point Inspection", "Scanning and Diagnostics" },
                    { 23, false, 1000f, 5, "Battery Replacement", "Value Added Services" },
                    { 24, false, 1000f, 5, "Tyre Replacement", "Value Added Services" },
                    { 25, false, 1000f, 5, "Insurance Renewal", "Value Added Services" },
                    { 26, false, 1000f, 5, "Customization", "Value Added Services" },
                    { 27, false, 1000f, 5, "Car Accessories", "Value Added Services" },
                    { 28, false, 1000f, 5, "Pre-owned Cars", "Value Added Services" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ServiceId",
                table: "Orders",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_ServiceCategoryId",
                table: "Services",
                column: "ServiceCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "ServiceCategories");
        }
    }
}
