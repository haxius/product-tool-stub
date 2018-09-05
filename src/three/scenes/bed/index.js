import { Collection } from "../../core";

import Base from "./base";
import Blanket from "./blanket";
import Mask from "./mask";

class Bed extends Collection {
  constructor(props) {
    super({
      file: null,
      repeatX: 1,
      repeatY: 1,
      rotate: 0,
      ...props
    });

    this.setState({
      ignoredFirstUpdate: false,
      blanket: null
    });
  }

  componentDidUpdate() {
    const { ignoredFirstUpdate, blanket } = this.state;

    if (!ignoredFirstUpdate) {
      this.setState({ ignoredFirstUpdate: true });
      return;
    }

    const { file, repeatX, repeatY, rotate } = this.props;

    if (!!file && !!blanket) {
      blanket.updateProps({ file, repeatX, repeatY, rotate });
    }
  }

  addToScene(scene) {
    const { domElement, file } = this.props;

    const blanket = new Blanket({ domElement, file });

    this.setState({
      entities: [new Base({ domElement }), blanket, new Mask({ domElement })],
      blanket
    });

    Collection.prototype.addToScene.call(this, scene);
  }
}

export default Bed;
