import React from "react";
import PropTypes from "prop-types";

class Posts extends React.Component {
    render() {
        return (
            <ul>
                {this.props.posts.map((post, index) => {
                    return(
                        <li key={index}> {post.title} </li>
                    );
                })}
            </ul>
        );
    };
}

Posts.porpTypes = {
    posts: PropTypes.array.isRequired
}

export default Posts;