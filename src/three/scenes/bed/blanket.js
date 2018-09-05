import { MeshBasicMaterial, TextureLoader, NoBlending } from "three";

import { Entity } from "../../core";
import { deg2Rad } from "../../math";

// NON ES6/7 Compliant Modules
const THREE = require("three");
const OBJLoader = require("three-obj-loader");
OBJLoader(THREE);

class Blanket extends Entity {
  constructor({ domElement, ...rest }) {
    const { offsetWidth: width, offsetHeight: height } = domElement;
    const size = height < width ? height : width;
    super({ domElement, ...rest });

    this.setState({
      originalSize: size,
      scaleMultiplier: {
        all: 0.0153,
        x: 1,
        y: 1,
        z: 1.2
      },
      offsetPercentage: {
        x: 0.69,
        y: -0.22
      },
      rotation: {
        x: 10,
        y: 120
      }
    });

    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  updateTextureFromFile(file, repeatX, repeatY, rotate) {
    const { objects: [blanket = null] = [] } = this.state;

    if (!!blanket) {
      const image = new Image();

      image.src = file;

      image.onload = () => {
        const mapCanvas = document.createElement("canvas");
        const context2d = mapCanvas.getContext("2d");
        const { width, height } = image;
        const drawParameters = [0, 0, width, height];

        mapCanvas.width = width;
        mapCanvas.height = height;

        context2d.translate(width / 2, height / 2);
        context2d.rotate(rotate);
        context2d.translate(-width / 2, -height / 2);
        context2d.drawImage(image, ...drawParameters, ...drawParameters);

        const newTexture = new THREE.Texture(mapCanvas);
        newTexture.needsUpdate = true;

        blanket.traverse(child => {
          if (child instanceof THREE.Mesh) {
            newTexture.wrapS = THREE.RepeatWrapping;
            newTexture.wrapT = THREE.RepeatWrapping;
            newTexture.repeat.set(repeatX, repeatY);

            child.material.map = newTexture;
            child.material.blending = NoBlending;
            child.material.opacity = 1;
            child.material.transparent = false;
            child.material.needsUpdate = true;
          }
        });
      };
    }
  }

  componentDidUpdate() {
    const { file, repeatX, repeatY, rotate } = this.props;
    this.updateTextureFromFile(file, repeatX, repeatY, rotate);
  }

  addToScene(scene) {
    const loader = new THREE.OBJLoader();
    const { domElement, file } = this.props;

    const { offsetWidth: width, offsetHeight: height } = domElement;
    const size = height < width ? height : width;

    const {
      scaleMultiplier: { all: scaleAll, x: scaleX, y: scaleY, z: scaleZ },
      offsetPercentage: { x: offsetXPercentage, y: offsetYPercentage },
      rotation: { x: rotationX, y: rotationY }
    } = this.state;

    const bgMaterial = new MeshBasicMaterial({
      opacity: 0,
      transparent: true,
      side: THREE.BackSide
    });

    loader.load("./blanket.obj", mesh => {
      mesh.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.material = bgMaterial;

          child.scale.x = size * scaleAll * scaleX;
          child.scale.y = size * scaleAll * scaleY;
          child.scale.z = size * scaleAll * scaleZ;
        }
      });

      mesh.rotation.x = deg2Rad(rotationX);
      mesh.rotation.y = deg2Rad(rotationY);
      mesh.position.x = (size / 2) * offsetXPercentage;
      mesh.position.y = (size / 2) * offsetYPercentage;
      mesh.position.z = -750;

      this.setState({ objects: [mesh] });
      scene.add(mesh);

      window.addEventListener("resize", () => this.onWindowResize(), false);
    });
  }

  onWindowResize() {
    const { domElement } = this.props;
    const { offsetWidth: width, offsetHeight: height } = domElement;
    const size = height < width ? height : width;

    const {
      objects: [blanket],
      scaleMultiplier: { all: scaleAll, x: scaleX, y: scaleY, z: scaleZ },
      offsetPercentage: { x: offsetXPercentage, y: offsetYPercentage }
    } = this.state;

    if (!!blanket) {
      blanket.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.scale.x = size * scaleAll * scaleX;
          child.scale.y = size * scaleAll * scaleY;
          child.scale.z = size * scaleAll * scaleZ;
        }
      });

      blanket.position.x = (size / 2) * offsetXPercentage;
      blanket.position.y = (size / 2) * offsetYPercentage;
    }
  }
}

export default Blanket;
