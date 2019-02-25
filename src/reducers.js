import { combineReducers } from "redux";
import {
    SELECT_SUBREDDIT,
    MOUSE_ENTER_POST,
    MOUSE_LEAVE_POST,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from './actions';

const initialSubredditState = "reactjs";
const selectedSubreddit = (state=initialSubredditState, action) => {
    switch(action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
};

const initialPostsState = {
    isFetching: false,
    didInvalidate: false,
    items: []
};
const posts = (state=initialPostsState, action) => {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

const initialMouseHoverHandlerState = {};
const mouseHoverHandlerForPosts = (state=initialMouseHoverHandlerState, action) => {
    switch(action.type) {
        case MOUSE_ENTER_POST:
            return Object.assign({}, state, {
                containsMouse: true
            });
        case MOUSE_LEAVE_POST:
            return Object.assign({}, state, {
                containsMouse: false
            });
        default:
            return state;
    }
}

const initialPostsBySubredditState = {};
const postsBySubreddit = (state=initialPostsBySubredditState, action) => {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            let newState = {};
            newState[action.subreddit] = posts(state[action.subreddit], action);
            return Object.assign({}, state, newState);
        case MOUSE_ENTER_POST:
        case MOUSE_LEAVE_POST:
            // TODO Update hover state.
            return state;
        default:
            return state;
    }
};

const rootRecuder = combineReducers({
    selectedSubreddit: selectedSubreddit,
    postsBySubreddit: postsBySubreddit
});

export default rootRecuder;