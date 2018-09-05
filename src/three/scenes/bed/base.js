import {
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  TextureLoader,
  NoBlending
} from "three";

import { Entity } from "../../core";

class Base extends Entity {
  constructor({ domElement }) {
    const { offsetWidth: width, offsetHeight: height } = domElement;
    const size = height < width ? height : width;

    const material = {
      color: 0xffffff,
      map: new TextureLoader().load("./base.jpg"),
      blending: NoBlending
    };

    const mesh = new Mesh(
      new PlaneGeometry(size, size),
      new MeshBasicMaterial(material)
    );

    mesh.position.z = -1500;
    super({ domElement, objects: [mesh] });
    this.setState({ originalSize: size });
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  onWindowResize() {
    const {
      originalSize,
      objects: [plane]
    } = this.state;

    const { domElement } = this.props;
    const { offsetWidth: width, offsetHeight: height } = domElement;
    const newSize = height < width ? height : width;
    const scale = newSize / originalSize;

    plane.scale.x = scale;
    plane.scale.y = scale;
  }
}

export default Base;
