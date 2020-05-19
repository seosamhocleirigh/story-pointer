using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace story_pointer.Hubs
{
    public class VoteHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectedUsers.Add(new User { WebSocketId = Context.ConnectionId, UserName = GenerateName(5) });
            PushConnectedUsersUpdate();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedUsers.RemoveAll(user => user.WebSocketId == Context.ConnectionId);
            PushConnectedUsersUpdate();
            return base.OnDisconnectedAsync(exception);
        }

        public void PushConnectedUsersUpdate()
        {
            Clients.All.SendAsync("updateConnectedUsers", 
                new { 
                    user = Context.User,
                    CurrentUser = UserHandler.ConnectedUsers.SingleOrDefault(user => user.WebSocketId == Context.ConnectionId),
                    ConnectedUsers = UserHandler.ConnectedUsers
                });
        }

        public void SetUserName(string name)
        {
            UserHandler.ConnectedUsers.Single(user => user.WebSocketId == Context.ConnectionId).UserName = name;
            PushConnectedUsersUpdate();
        }

        public void UpdatePokerSubject(string name, string message)
        {
            Clients.All.SendAsync("updatePokerSubject", name, message);
        }

        public void CastVote(float vote)
        {
            UserHandler.ConnectedUsers.Single(user => user.WebSocketId == Context.ConnectionId).Vote = vote;
            PushConnectedUsersUpdate();
        }

        public void ClearVotes()
        {
            UserHandler.ConnectedUsers.ForEach(user => user.Vote = null);
            PushConnectedUsersUpdate();
        }

        public static string GenerateName(int len)
        {
            Random r = new Random();
            string[] consonants = { "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "l", "n", "p", "q", "r", "s", "sh", "zh", "t", "v", "w", "x" };
            string[] vowels = { "a", "e", "i", "o", "u", "ae", "y" };
            string Name = "";
            Name += consonants[r.Next(consonants.Length)].ToUpper();
            Name += vowels[r.Next(vowels.Length)];
            int b = 2; //b tells how many times a new letter has been added. It's 2 right now because the first two letters are already in the name.
            while (b < len)
            {
                Name += consonants[r.Next(consonants.Length)];
                b++;
                Name += vowels[r.Next(vowels.Length)];
                b++;
            }

            return Name;
        }
    }

    public static class UserHandler
    {
        public static List<User> ConnectedUsers = new List<User>();
    }

    public class User
    {
        public string WebSocketId { get; set; }
        public string UserName { get; set; }
        public float? Vote { get; set; } = null;
    }
}
