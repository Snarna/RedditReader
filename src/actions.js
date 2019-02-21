import fetch from "cross-fetch";

// Actions
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const MOUSE_ENTER_POST = "MOUSE_ENTER_POST";
export const MOUSE_EXIT_POST = "MOUSE_EXIT_POST";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

// Action creators
export const selectSubreddit = (subreddit) => ({
    type: SELECT_SUBREDDIT,
    subreddit: subreddit
});

export const mouseEnterPost = (postIndex) => {
    return (dispatch, getState) => {
        let a = getState();
        return {
            type: MOUSE_ENTER_POST,
            postIndex: postIndex
        };
    }
}

export const mouseExitPost = (postIndex) => {
    return {
        type: MOUSE_EXIT_POST,
        postIndex: postIndex
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
    if(!posts) {
        return true;
    }
    else if(posts.isFetching) {
        return false;
    }
    else {
        return posts.didInvalidate;
    }
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