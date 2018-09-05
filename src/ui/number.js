import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const BaseNumber = styled.input.attrs({
  type: "number",
  className: "common--number"
})``;

class Number extends PureComponent {
  ref = null;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  handleChange(event) {
    const { handleChange } = this.props;
    let value = event.target.value;

    handleChange(parseInt(value));
  }

  render() {
    const handleChange = e => this.handleChange(e);
    return <BaseNumber ref={this.ref} onChange={handleChange} />;
  }
}

Number.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default Number;
