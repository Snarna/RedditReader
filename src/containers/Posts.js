import React from "react";
import PropTypes from "prop-types";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Post from "../components/Post";

class Posts extends React.Component {
    handleMouseEnter = (index) => {
        console.log("Mouse enter:" + index);
    }

    handleMouseLeave = (index) => {
        console.log("Mouse leave:" + index);
    }

    render() {
        return (
            this.props.posts.map((post, index) => {
                return(
                    <ListGroupItem style={{margin: "0 0 30px 0"}} >
                        <Post 
                            post={post} 
                            index={index}
                            onMouseEnter={() => this.handleMouseEnter(index)}
                            onMouseLeave={() => this.handleMouseLeave(index)} 
                        />
                    </ListGroupItem>
                );
            })
        );
    };
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}

export default Posts;