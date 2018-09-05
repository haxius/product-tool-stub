import uniqueId from 'lodash.uniqueid';
import { Component } from './';

class Collection extends Component {
  constructor({
    entities = [],
    actors = [],
    players = [],
    id = uniqueId("col"),
    vector: {
      x = 0,
      y = 0,
      z = 0,
    } = {},
    ...props,
  } = {}) {
    super({
      vector: { x, y, z },
      ...props
    });
    
    this.state = {
      entities,
      actors,
      players,
      id,
    };
    
    this._setChildrenInitialProps();
  }
  
  getId() {
    const { id } = this.state;
    return id;
  }
  
  _getAll() {
    const {
      entities,
      actors,
      players,
    } = this.state;
    
    return [
      ...entities,
      ...actors,
      ...players,
    ];
  }
  
  _setChildInitialProps(child) {
    const { domElement } = this.props;

    child.updateProps({
      getNewCoords: this._getChildCoords,
      domElement
    });
  }
  
  _setChildrenInitialProps() {
    const children = this._getAll();
    children.map(item => this._setChildInitialProps(item));
  }
  
  _getChildCoords = ({ x: cx, y: cy, z: cz } = {}) => {
    const { vector: { x, y, z } = {} } = this.props;
    
    return {
      x: cx + x,
      y: cy + y,
      z: cz + z,
    };
  }
  
  addToScene(scene) {
    const children = this._getAll();  
    children.map(item => item.addToScene(scene));
  }
  
  removeFromScene(scene) {
    const children = this._getAll();
    children.map(item => item.removeFromScene(scene));
  }
  
  tick() {
    const children = this._getAll();
    children.map(item => item.tick());
  }
}

export default Collection;
