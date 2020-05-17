using Microsoft.AspNetCore.SignalR;

namespace story_pointer.Hubs
{
    public class VoteHub : Hub
    {
        public void SendVoteToAll(VoteDto voteDto)
        {
            Clients.All.SendAsync("sendVoteToAll", voteDto);
        }
    }
}
