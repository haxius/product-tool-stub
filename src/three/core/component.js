class Component {
  props = {};
  state = {};

  constructor(initialProps = {}, defaultProps = {}) {
    this.updateProps({
      ...defaultProps,
      ...initialProps
    });
  }

  updateProps(newProps = {}) {
    this.props = {
      ...this.props,
      ...newProps
    };

    if (
      !!this.componentDidUpdate &&
      "function" === typeof this.componentDidUpdate
    )
      this.componentDidUpdate();
  }

  setState(newState = {}) {
    this.state = {
      ...this.state,
      ...newState
    };
  }
}

export default Component;
