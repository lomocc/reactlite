import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Lifecycle extends Component {
  static propTypes = {
    constructor: PropTypes.func,
    componentDidMount: PropTypes.func,
    componentWillUnmount: PropTypes.func,
    shouldComponentUpdate: PropTypes.func,
    getSnapshotBeforeUpdate: PropTypes.func,
    componentDidUpdate: PropTypes.func,
    render: PropTypes.func
  };

  constructor({
    constructor,
    componentDidMount,
    componentWillUnmount,
    shouldComponentUpdate,
    getSnapshotBeforeUpdate,
    componentDidUpdate,
    render
  }) {
    super();

    if (componentDidMount) {
      this.componentDidMount = componentDidMount.bind(this);
    }
    if (componentWillUnmount) {
      this.componentWillUnmount = componentWillUnmount.bind(this);
    }
    if (shouldComponentUpdate) {
      this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }
    if (getSnapshotBeforeUpdate) {
      this.getSnapshotBeforeUpdate = getSnapshotBeforeUpdate.bind(this);
    }
    if (componentDidUpdate) {
      this.componentDidUpdate = componentDidUpdate.bind(this);
    }

    if (render) {
      this.render = render.bind(this);
    } else {
      this.render = () => this.props.children || null;
    }

    constructor && constructor.apply(this);
  }
}
