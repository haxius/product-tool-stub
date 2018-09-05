import React, { Component } from "react";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";

import { Loop } from "../three/core";

const Wrapper = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "center",
  className: "common--renderer-wrapper"
})`
  width: 100%;
`;

const Canvas = styled(Box).attrs({
  className: "common--renderer"
})`
  ${({
    theme: {
      renderer: { maxWidth, maxHeight }
    }
  }) => `
    max-width: ${maxWidth};
    max-height: ${maxHeight};

    // @media screen and (orientation: landscape) {
      // height: 100vh;
      // width: 100vh;
    // }

    // @media screen and (orientation: portrait) {
      height: 100vw;
      width: 100vw;
    // }
  `};
`;

class Renderer extends Component {
  state = { game: null };
  ref = null;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { current: domElement } = this.ref;
    const { collections } = this.props;
    const game = new Loop({ collections, domElement });
    game.tick();
    this.setState({ game });
  }

  render() {
    return (
      <Wrapper>
        <Canvas innerRef={this.ref} />
      </Wrapper>
    );
  }
}

export default Renderer;
