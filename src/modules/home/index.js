import React, { Fragment, Component } from "react";

import { deg2Rad } from "../../three/math";
import { View, Renderer } from "../../ui";
import { Bed } from "../../three/scenes";
import Form from "./form";

class Home extends Component {
  state = {
    bed: new Bed(),
    repeat: 1,
    rotate: 0
  };

  handleDirectChange = (repeat, rotate, file) => {
    const { bed } = this.state;

    bed.updateProps({
      file,
      repeatX: repeat,
      repeatY: repeat,
      rotate: deg2Rad(rotate)
    });

    this.setState({ repeat: repeat, rotate });
  };

  handleFileChange = file => {
    const { bed } = this.state;
    bed.updateProps({ file, rotate: 0, repeatX: 1, repeatY: 1 });
    this.setState({ repeat: 1, rotate: 0 });
  };

  handleRepeatChange = repeat => {
    const { bed } = this.state;
    bed.updateProps({ repeatX: repeat, repeatY: repeat });
    this.setState({ repeat });
  };

  handleRotateChange = direction => {
    const { bed, rotate } = this.state;

    let newRotate = "right" === direction ? rotate + 90 : rotate - 90;

    if (360 === newRotate) newRotate = 0;
    if (0 > newRotate) newRotate = 270;

    bed.updateProps({ rotate: deg2Rad(newRotate) });
    this.setState({ rotate: newRotate });
  };

  render() {
    const { bed, repeat } = this.state;

    return (
      <View>
        <Form
          handleRepeatChange={this.handleRepeatChange}
          handleRotateChange={this.handleRotateChange}
          handleFileChange={this.handleFileChange}
          handleDirectChange={this.handleDirectChange}
          repeat={repeat}
        />
        <Renderer collections={[bed]} />
      </View>
    );
  }
}

export default Home;
