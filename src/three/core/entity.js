import uniqueId from 'lodash.uniqueid';
import { Component } from './';

class Entity extends Component {
  constructor({
    id = uniqueId("ent"),
    objects = [],
    ...props,
  } = {}) {
    super(props);

    this.state = {
      id,
      objects,
    };
  }

  getId() {
    const { id } = this.state;
    return id;
  }

  addToScene(scene) {
    const { objects } = this.state;

    if (objects.length) {
      scene.add(...objects);
    }
  }

  removeFromScene(scene) {
    const { objects } = this.state;

    if (objects.length) {
      scene.remove(...objects);
    }
  }

  tick(){}
}

export default Entity;
