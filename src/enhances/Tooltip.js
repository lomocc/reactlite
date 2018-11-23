import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'tooltip.js';

export default class extends React.Component {
  targetRef = React.createRef();
  static defaultProps = {
    placement: 'auto',
    trigger: 'hover'
  };
  componentDidMount() {
    let { placement, trigger, content } = this.props;
    const target = ReactDOM.findDOMNode(this.targetRef.current);
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
