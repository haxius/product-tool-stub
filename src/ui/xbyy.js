import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "grid-styled";

export const BaseXbyY = styled(Box).attrs({
  className: "common--xbyy"
})`
  position: relative;
  border-right: 1px solid #eee;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;

  &:last-child {
    border-right: 0px;
  }

  &:hover {
    background-color: #eee;
  }

  &.active {
    background-color: #ddd;
  }

  > img {
    pointer-events: none;
    width: 100%;
    visibility: hidden;
  }

  > div {
    position: absolute;
    font-size: 12px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  ${({
    theme: {
      view: { maxWidth }
    }
  }) => `
    @media screen and (min-width: ${maxWidth}) {
      &:first-child {
        border-left: 1px solid #eee;
      }
      &:last-child {
        border-right: 1px solid #eee;
      }
    }
  `};
`;

const XByY = ({ x, y, ...rest }) => (
  <BaseXbyY {...rest}>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />

    <div>
      {x} x {y}
    </div>
  </BaseXbyY>
);

XByY.propTypes = {
  x: PropTypes.any.isRequired,
  y: PropTypes.any.isRequired
};

export default XByY;
