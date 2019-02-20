import React from "react";
import PropTypes from "prop-types";

class Picker extends React.Component {
    render() {
        return(
            <span>
                <h1>{this.props.value}</h1>
                <select onChange={e => this.props.onChange(e.target.value)} value={this.props.value}>
                    {this.props.options.map((option, index) => {
                        return(
                            <option value={option} key={option+index}>
                                {option}
                            </option>
                        );
                    })}
                </select>
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
