import {
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  TextureLoader,
  NormalBlending
} from "three";

import { Entity } from "../../core";

class Mask extends Entity {
  constructor({ domElement }) {
    const { offsetWidth: width, offsetHeight: height } = domElement;
    const size = height < width ? height : width;
    
    const bgMaterial = { 
      color: 0xffffff,
      map: new TextureLoader().load("./mask.png"),
      NormalBlending,
      transparent: true
    };

    const mesh = new Mesh(
      new PlaneGeometry(size, size),
      new MeshBasicMaterial(bgMaterial)
    );

    mesh.position.z = -5;
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

export default Mask;
