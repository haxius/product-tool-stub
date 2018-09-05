import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Flex } from "grid-styled";
import { File, Number, XByY, Rotate, Tile } from "../../ui";

const RowWithBorder = styled(Flex).attrs({
  flexDirection: "row"
})`
  ${({ noborder }) =>
    noborder
      ? ""
      : `
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  `};

  &:first-child {
    border-bottom: 0;
  }

  &:last-child {
    border-top: 0;
  }

  font-size: 0px;
`;

const Form = ({
  handleRepeatChange,
  handleRotateChange,
  handleFileChange,
  handleDirectChange,
  repeat
}) => {
  const xy = r => (
    <XByY
      x={r}
      y={r}
      width={1 / 5}
      onClick={() => handleRepeatChange(r)}
      className={r == repeat ? "active" : ""}
    />
  );

  const rotate = d => (
    <Rotate direction={d} width={1 / 5} onClick={() => handleRotateChange(d)} />
  );

  const tile = (repeat, rotate, file) => (
    <Tile
      x={repeat}
      y={repeat}
      file={file}
      width={1 / 5}
      onClick={() => handleDirectChange(repeat, rotate, file)}
    />
  );

  return (
    <Flex flexDirection="column">
      <RowWithBorder>
        {rotate("right")} {xy(1)} {xy(2)} {xy(3)} {xy(4)}
      </RowWithBorder>
      <RowWithBorder>
        {rotate("left")} {xy(8)} {xy(16)} {xy(24)} {xy(32)}
      </RowWithBorder>
      <RowWithBorder noborder={1}>
        {tile(4, 0, "./woah.jpg")}
        {tile(3, 0, "./flower.jpg")}
        {tile(2, 0, "./pattern.jpg")}
        {tile(8, 0, "./flower3.jpg")}
        {tile(4, 90, "./waves.jpg")}
      </RowWithBorder>
      <File handleChange={handleFileChange} />
    </Flex>
  );
};

Form.propTypes = {
  handleRepeatChange: PropTypes.func.isRequired,
  handleRotateChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleDirectChange: PropTypes.func.isRequired,
  repeat: PropTypes.number.isRequired
};

export default Form;
