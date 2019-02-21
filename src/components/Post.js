import React from "react";
import PropTypes from "prop-types";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import noimg from "../assets/noimg.png";

class Post extends React.Component {
    render() {
        return (
            <Media onMouseEnter={this.props.onMouseEnterPost} onMouseLeave={this.props.onMouseLeavePost}>
                <a href={this.props.post.url} style={{margin: "0 10px 0 0"}}>
                    <Image width={128} height={128} src={(this.props.post.thumbnail && this.props.post.thumbnail.substring(0,4) === "http") ? this.props.post.thumbnail : noimg} rounded/>
                </a>
                <Media.Body>
                    <h6> <a href={this.props.post.url}>{this.props.post.title}</a> </h6>
                    <p>
                        Author: {this.props.post.author}
                    </p>
                </Media.Body>
            </Media>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onMouseEnterPost: PropTypes.func.isRequired,
    onMouseLeavePost: PropTypes.func.isRequired
}

export default Post;