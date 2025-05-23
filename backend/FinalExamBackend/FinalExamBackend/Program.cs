using FinalExamBackend.Data;
using FinalExamBackend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EntertainmentAgencyExampleContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("EntertainmentConnection")));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactApp",
        policy => {
            policy.WithOrigins("http://localhost:3000", "https://happy-sea-0f9d78e1e.6.azurestaticapps.net")
                .AllowAnyMethod()
                .AllowAnyHeader();
        }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();