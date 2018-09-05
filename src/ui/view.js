import styled from "styled-components";
import { Flex } from "grid-styled";

export default styled(Flex).attrs({
  className: "common--view",
  flexDirection: "column"
})`
  ${({
    theme: {
      view: { maxWidth, minWidth }
    }
  }) => `
    width: 100%;
    max-width: ${maxWidth};
    min-width: ${minWidth};

    @media screen and (min-width: ${maxWidth}) {
      margin-left: auto;
      margin-right: auto;
    }
  `};
`;
