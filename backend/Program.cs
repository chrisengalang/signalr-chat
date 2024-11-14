using backend.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddCors(options => {
    options.AddPolicy("react-policy", builder => {
        builder.WithOrigins("http://localhost:5173")
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("react-policy");
app.MapHub<TextChatHub>("/text-chat");

app.Run();
