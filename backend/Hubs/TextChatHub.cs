using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs;

public class TextChatHub : Hub {

    public async Task SendMessage(string name, string message) {
        await Clients.All.SendAsync("ReceiveMessage", name, message);
    }

}