import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'tooltip.js';

export default class Container extends React.Component {
  boxRef = React.createRef();

  componentDidMount() {
    let dom = ReactDOM.findDOMNode(this.boxRef.current);
    console.log('Container findDOMNode Ref', dom);
  }
  render() {
    let { children } = this.props;
    return React.cloneElement(children, {
      ref: this.boxRef
    });
  }
}

class Tooltip2 extends React.Component {
  targetRef = React.createRef();
  static defaultProps = {
    placement: 'auto',
    trigger: 'hover'
  };
  componentDidMount() {
    let { placement, trigger, content } = this.props;

    const target = ReactDOM.findDOMNode(this.targetRef.current);
    console.log('componentDidMount', this.targetRef.current, target);
    // this.tooltip = new Tooltip(target, {
    //   placement,
    //   trigger,
    //   title: content
    // });
  }
  componentDidMount2() {
    let { placement, trigger, content } = this.props;

    const target = ReactDOM.findDOMNode(this.targetRef);
    console.log('componentDidMount', this, target);
    this.tooltip = new Tooltip(target, {
      placement,
      trigger,
      title: content
    });
  }
  componentWillUnmount() {
    if (this.tooltip) {
      this.tooltip.dispose();
      this.tooltip = null;
    }
  }
  render() {
    const { children } = this.props;
    return React.cloneElement(children, {
      ref: this.targetRef
    });
  }
}
