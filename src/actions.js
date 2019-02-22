import fetch from "cross-fetch";

// Actions
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const MOUSE_ENTER_POST = "MOUSE_ENTER_POST";
export const MOUSE_LEAVE_POST = "MOUSE_LEAVE_POST";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

// Action creators
export const selectSubreddit = (subreddit) => ({
    type: SELECT_SUBREDDIT,
    subreddit: subreddit
});

export const mouseEnterPost = (subreddit, index) => {
    return {
        type: MOUSE_ENTER_POST,
        subreddit: subreddit,
        index: index
    };
}

export const mouseLeavePost = (subreddit, index) => {
    return {
        type: MOUSE_LEAVE_POST,
        subreddit: subreddit,
        index: index
    }
}

const requestPosts = (subreddit) => ({
    type: REQUEST_POSTS,
    subreddit: subreddit
});

const receivePosts = (subreddit, json) => ({
    type: RECEIVE_POSTS,
    subreddit: subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
});

export const invalidateSubreddit = (subreddit) => ({
    type: INVALIDATE_SUBREDDIT,
    subreddit: subreddit
});

export const fetchPosts = (subreddit) => {
    return (dispatch) => {
        // Tell UI to update
        dispatch(requestPosts(subreddit));
        
        // Fetch From Reddit
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)));
    }
}

const shouldFetchPosts = (state, subreddit) => {
    const posts = state.postsBySubreddit[subreddit];
    if(!posts) { return true; }
    else if(posts.isFetching) { return false; }
    else { return posts.didInvalidate;}
}

export const fetchPostsIfNeeded = (subreddit) => {
    return (dispatch, getState) => {
        if(shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit));
        }
        else {
            return Promise.resolve();
        }
    }
}