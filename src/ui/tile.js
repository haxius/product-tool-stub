import React from "react";
import PropTypes from "prop-types";
import { RotateLeftIcon, RotateRightIcon } from "mdi-react";

import { BaseXbyY } from "./xbyy";

const BaseTile = BaseXbyY.extend.attrs({
  className: "common--image"
})`
  > img {
    visibility: visible;
  }

  > div {
    background-color: white;
    padding: 12px;
    border: 1px solid black;
    border-radius: 10px;
  }

  border-right: 0px;

  ${({
    theme: {
      view: { maxWidth }
    }
  }) => `
    @media screen and (min-width: ${maxWidth}) {
      &:first-child {
        border-left: 0px;
      }
      &:last-child {
        border-right: 0px;
      }
    }
  `};
`;

const Tile = ({ x, y, file, ...rest }) => (
  <BaseTile {...rest}>
    <img src={file} />

    <div>
      {x} x {y}
    </div>
  </BaseTile>
);

Tile.propTypes = {
  x: PropTypes.any.isRequired,
  y: PropTypes.any.isRequired,
  file: PropTypes.string.isRequired
};

export default Tile;
