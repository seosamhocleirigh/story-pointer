﻿using Microsoft.AspNetCore.SignalR;
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
            // TODO: find out if its possible to use the Context.User correctly instead of the UserHandler
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
            PushConnectedUsersUpdate();
        }

        public void CastVote(float vote)
        {
            UserHandler.ConnectedUsers.Single(user => user.WebSocketId == Context.ConnectionId).Vote = vote;
            PushConnectedUsersUpdate();
        }

        public void ShowVotes()
        {
            UserHandler.ConnectedUsers.ForEach(user => user.ShowVote = true);
            PushConnectedUsersUpdate();
        }

        public void ClearVotes()
        {
            UserHandler.ConnectedUsers.ForEach(user => user.Vote = null);
            UserHandler.ConnectedUsers.ForEach(user => user.ShowVote = false);
            PushConnectedUsersUpdate();
        }

        public async Task ListGroups()
        {
            await Clients.Client(Context.ConnectionId).SendAsync("groupsListUpdate", new { groupsList = GroupHandler.GroupNames });
        }

        public async Task AddToGroup(string groupName)
        {
            if (!GroupHandler.GroupNames.Contains(groupName))
                GroupHandler.GroupNames.Add(groupName);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
            await Clients.Client(Context.ConnectionId).SendAsync("groupsListUpdate", new { groupsList = GroupHandler.GroupNames });
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
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

    public static class GroupHandler
    {
        public static List<string> GroupNames = new List<string>();
    }

    public class User
    {
        public string WebSocketId { get; set; }
        public string UserName { get; set; }
        public float? Vote { get; set; } = null;
        public bool ShowVote { get; set; }
    }
}
