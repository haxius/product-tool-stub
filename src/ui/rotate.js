import React from "react";
import PropTypes from "prop-types";
import { RotateLeftIcon, RotateRightIcon } from "mdi-react";

import { BaseXbyY } from "./xbyy";

const BaseRotate = BaseXbyY.extend.attrs({
  className: "common--rotate"
})``;

const Rotate = ({ direction, ...rest }) => (
  <BaseRotate {...rest}>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />

    <div>
      {"left" === direction && <RotateLeftIcon />}
      {"right" === direction && <RotateRightIcon />}
    </div>
  </BaseRotate>
);

Rotate.propTypes = {
  direction: PropTypes.string.isRequired
};

export default Rotate;
