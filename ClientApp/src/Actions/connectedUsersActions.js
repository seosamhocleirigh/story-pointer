import { SIGR_SET_USER_NAME, SIGR_CAST_VOTE, SIGR_CLEAR_VOTES, SIGR_SHOW_VOTES } from './actionTypes';

export const setUserName = payload => ({
    type: SIGR_SET_USER_NAME,
    payload
});

export const castVote = payload => ({
    type: SIGR_CAST_VOTE,
    payload
});

export const showVotes = () => ({
    type: SIGR_SHOW_VOTES
});

export const clearVotes = () => ({
    type: SIGR_CLEAR_VOTES
});