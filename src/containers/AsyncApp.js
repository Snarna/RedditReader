import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit
} from "../actions";
import Picker from "../components/Picker";
import Posts from "../components/Posts";

class AsyncApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit));
    }

    componentDidUpdate(prevProps) {
        if(this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
            this.props.dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit));
        }
    }

    handleChange(nextSubreddit) {
        this.props.dispatch(selectSubreddit(nextSubreddit));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        this.props.dispatch(invalidateSubreddit(this.props.selectedSubreddit));
        this.props.dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit));
    }

    render() {
        return(
            <div> 
                <Picker 
                    value={this.props.selectedSubreddit}
                    onChange={this.handleChange}
                    options={["reactjs", "frontend"]}
                />
                <p>
                    {this.props.lastUpdated && (
                        <span>
                            Last updated at {new Date(this.props.lastUpdated).toLocaleTimeString()}.{' '}
                        </span>
                    )}
                    {!this.props.isFetching && (
                        <button onClick={this.handleRefreshClick}>Refresh</button>
                    )}
                </p>
                {this.props.isFetching && this.props.posts.length === 0 && (
                    <h2>Loading ....</h2>
                )}
                {!this.props.isFetching && this.props.posts.length === 0 && (
                    <h2>No posts.</h2>
                )}
                {this.props.posts.length > 0 && (
                    <div style={{opacity: this.props.isFetching? 0.5 : 1.0}}>
                        <Posts posts={this.props.posts} />
                    </div>
                )}
            </div>
        );
    }
}

AsyncApp.propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    const { selectedSubreddit, postsBySubreddit } = state
    const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
        selectedSubreddit
    ] || {
        isFetching: true,
        items: []
    }
    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(AsyncApp);