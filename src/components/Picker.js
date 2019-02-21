import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

class Picker extends React.Component {
    render() {
        return(
            <span>
                <Form>
                    <Form.Group>
                        <Form.Control as="select" onChange={e => this.props.onChange(e.target.value)} value={this.props.value}>
                            {this.props.options.map((option, index) => {
                                return (
                                    <option value={option} key={index}> {option} </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </span>
        );
    }
}

Picker.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Picker;
