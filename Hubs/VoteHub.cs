using Microsoft.AspNetCore.SignalR;

namespace story_pointer.Hubs
{
    public class VoteHub : Hub
    {
        public void UpdatePokerSubject(string name, string message)
        {
            Clients.All.SendAsync("updatePokerSubject", name, message);
        }

        public void SendVoteToAll(VoteDto voteDto)
        {
            Clients.All.SendAsync("sendVoteToAll", voteDto);
        }
    }
}
