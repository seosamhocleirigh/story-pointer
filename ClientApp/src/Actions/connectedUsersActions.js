﻿import { SET_USER_NAME, CAST_VOTE, CLEAR_VOTES, SHOW_VOTES } from './actionTypes';

export const setUserName = payload => ({
    type: SET_USER_NAME,
    payload
});

export const castVote = payload => ({
    type: CAST_VOTE,
    payload
});

export const showVotes = () => ({
    type: SHOW_VOTES
});

export const clearVotes = () => ({
    type: CLEAR_VOTES
});