import {
	Scene,
	OrthographicCamera,
	WebGLRenderer
} from 'three';

import { Component } from './';

class Loop extends Component {
	constructor({
		clip: {
			near = 0.1,
			far = 2000,
		} = {},
		collections = [],
		domElement,
    ...rest,
	} = {}) {
		super({ domElement, ...rest});

		const { offsetWidth: width, offsetHeight: height } = domElement;
		const camera = new OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, near, far);
		const scene = new Scene();
		const renderer = new WebGLRenderer({ alpha: true });

		renderer.setPixelRatio(window.devicePixelRatio);
		camera.position.z = 250;
		this.state = { camera, scene, renderer, collections };
    
    collections.map(collection => {
			this._setChildInitialProps(collection);
			collection.addToScene(scene);
		});

		renderer.setSize(width, height);
		domElement.appendChild(renderer.domElement);
		window.addEventListener('resize', () => this.onWindowResize(), false);
	}

	_setChildInitialProps(child) {
		const { domElement } = this.props;
    child.updateProps({ domElement });
  }
  
  addCollection(collection) {
    const { collections, scene } = this.state;
    
		collections.push(collection);
		this._setChildInitialProps(collection);
    collection.addToScene(scene);
    
    this.setState({ collections });
  }
  
  removeCollection(id) {
    const { collections, scene } = this.state;
    
    const updatedCollections = collections.filter(collection => {
      const keep = collection.getId() != id;
      
      if(!keep) {
        collection.removeFromScene(scene);
      }
      
      return keep;
		});
		
		this.setState({
			collections: updatedCollections,
		});
	}
	
	onWindowResize() {
		const {
			camera,
			renderer,
		} = this.state;
		
		const { domElement } = this.props;
		const { offsetWidth: width, offsetHeight: height } = domElement;

		camera.left = width / -2;
		camera.right = width / 2;
		camera.top = height / 2;
		camera.bottom = height / -2;

		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
	}
	
	tick() {
    const { scene, camera, collections, renderer } = this.state;

    collections.map(collection => collection.tick());
		window.requestAnimationFrame(() => this.tick());
		renderer.render(scene, camera);
	}
}

export default Loop;
