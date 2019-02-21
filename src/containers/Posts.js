import React from "react";
import PropTypes from "prop-types";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Post from "../components/Post";

class Posts extends React.Component {
    render() {
        return (
            this.props.posts.map((post, index) => {
                return(
                    <ListGroupItem style={{margin: "0 0 30px 0"}} >
                        <Post 
                            post={post} 
                            index={index}
                            onMouseEnterPost={() => this.props.onMouseEnterPost(index)}
                            onMouseLeavePost={() => this.props.onMouseLeavePost(index)} 
                        />
                    </ListGroupItem>
                );
            })
        );
    };
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    onMouseEnterPost: PropTypes.func.isRequired,
    onMouseLeavePost: PropTypes.func.isRequired
}

export default Posts;