import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'tooltip.js';

export default class extends React.Component {
  triggerRef = React.createRef();
  static defaultProps = {
    placement: 'auto',
    trigger: 'hover'
  };
  componentDidMount() {
    let { placement, trigger, content } = this.props;
    console.log('componentDidMount', this);
    const target = ReactDOM.findDOMNode(this.triggerRef.current);
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
    return React.cloneElement(children, { ref: this.triggerRef });
  }
}
