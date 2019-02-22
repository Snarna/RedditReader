import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit,
    mouseEnterPost,
    mouseLeavePost
} from "../actions";
import Picker from "../components/Picker";
import Posts from "./Posts";

// Test boostrap
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

class AsyncApp extends React.Component {
    componentDidMount = () => {
        this.props.dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit));
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
            this.props.dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit));
        }
    }

    handleChange = (nextSubreddit) => {
        this.props.dispatch(selectSubreddit(nextSubreddit));
    }

    handleRefreshClick = (e) => {
        e.preventDefault();

        this.props.dispatch(invalidateSubreddit(this.props.selectedSubreddit));
        this.props.dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit));
    }

    handlerMouseEnterPost = (index) => {
        this.props.dispatch(mouseEnterPost(this.props.selectedSubreddit, index));
    }

    handleMouseLeavePost = (index) => {
        this.props.dispatch(mouseLeavePost(this.props.selectedSubreddit, index));
    }

    render() {
        return(

            <Container>
                <Jumbotron>
                    <h1> Subreddit Viewer </h1>
                    <p> 
                        Current selected topic: {this.props.selectedSubreddit}
                    </p>
                </Jumbotron>

                <Row style={{margin: "5px 0 5px 0"}}>
                    <Col sm="10">
                        <Picker 
                            value={this.props.selectedSubreddit}
                            onChange={this.handleChange}
                            options={["reactjs", "frontend", "anime"]}
                        />
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={this.handleRefreshClick} disabled={this.props.isFetching} block> {this.props.isFetching ? "Fetching..." : "Refresh"} </Button>
                    </Col>
                </Row>

                <Row style={{margin: "5px 0 5px 0"}}>
                    <Col>
                        {this.props.lastUpdated && (
                            <div>
                                 Last Updated: {new Date(this.props.lastUpdated).toLocaleTimeString()}
                            </div>
                        )}
                    </Col>
                </Row>
                
                {!this.props.isFetching && this.props.posts.length === 0 && (
                    <Row style={{margin: "5px 0 5px 0"}}>
                        <Col>
                            <h2> No Posts </h2>
                        </Col>
                    </Row>
                )}

                {this.props.posts.length > 0 && (
                    <Row style={{margin: "5px 0 5px 0"}}>
                        <Col>
                            <ListGroup>
                                <Posts 
                                    posts={this.props.posts}
                                    onMouseEnterPost={(index) => this.handlerMouseEnterPost(index)}
                                    onMouseLeavePost={(index) => this.handleMouseLeavePost(index)}
                                />
                            </ListGroup>
                        </Col>
                    </Row>
                )}
            </Container>
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
    const { selectedSubreddit, postsBySubreddit } = state;
    const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
        isFetching: false,
        items: []
    };
    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(AsyncApp);