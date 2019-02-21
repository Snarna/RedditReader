import React from "react";
import PropTypes from "prop-types";

import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";

import noimg from "../assets/noimg.png";

class Posts extends React.Component {
    render() {
        return (
            this.props.posts.map((post, index) => {
                console.log(post.thumbnail);
                return(
                    <Media as="li" style={{margin: "0 0 30px 0"}}>
                        <a href={post.url}>
                            <Image width={128} height={128} src={(post.thumbnail !== "self" && post.thumbnail !== "default") ? post.thumbnail : noimg} thumbnail/>
                        </a>
                        <Media.Body>
                            <h5> <a href={post.url}>{post.title}</a> </h5>
                            <p>
                                Author: {post.author}
                            </p>
                        </Media.Body>
                    </Media>
                );
            })
        );
    };
}

Posts.porpTypes = {
    posts: PropTypes.array.isRequired
}

export default Posts;