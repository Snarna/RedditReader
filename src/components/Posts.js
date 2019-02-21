import React from "react";
import PropTypes from "prop-types";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import noimg from "../assets/noimg.png";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class Posts extends React.Component {
    render() {
        return (
            this.props.posts.map((post, index) => {
                return(
                    <ListGroupItem style={{margin: "0 0 30px 0"}}>
                        <Media>
                            <a href={post.url} style={{margin: "0 10px 0 0"}}>
                                <Image width={128} height={128} src={(post.thumbnail && post.thumbnail.substring(0,4) === "http") ? post.thumbnail : noimg} rounded/>
                            </a>
                            <Media.Body>
                                <h5> <a href={post.url}>{post.title}</a> </h5>
                                <p>
                                    Author: {post.author}
                                </p>
                            </Media.Body>
                        </Media>
                    </ListGroupItem>
                );
            })
        );
    };
}

Posts.porpTypes = {
    posts: PropTypes.array.isRequired
}

export default Posts;