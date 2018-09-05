import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { BaseXbyY } from "./xbyy";

const BaseFile = BaseXbyY.extend.attrs({
  className: "common--file"
})`
  height: 32px;
  position: relative;
`;

const Input = styled.input.attrs({
  type: "file",
  className: "common--file-input",
  accept: "image/jpeg"
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  appearance: none;
  visibility: hidden;
`;

class File extends PureComponent {
  ref = null;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  handleChange(event) {
    const { handleChange } = this.props;
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file) return;

    reader.addEventListener("load", () => handleChange(reader.result), false);

    reader.readAsDataURL(file);
  }

  handleClick() {
    this.ref.current.click();
  }

  render() {
    const handleChange = e => this.handleChange(e);
    const handleClick = () => this.handleClick();
    const { handleChange: foo, ...rest } = this.props;

    return (
      <BaseFile {...rest} onClick={handleClick}>
        <div>Click here or Drag and Drop a File (Must be 1:1 Ratio!)</div>
        <Input innerRef={this.ref} onChange={handleChange} />
      </BaseFile>
    );
  }
}

File.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default File;
