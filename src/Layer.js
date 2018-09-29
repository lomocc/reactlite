import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * 层组件
 * let instance = Layer.addElement(<Tooltip>);
 * Layer.removeElement(instance);
 */

export default class Layer extends React.Component {
  static __layerRootContainer;
  static __layerMap = new Map();
  static get layerRootContainer() {
    if (!Layer.__layerRootContainer) {
      const container = document.body.appendChild(
        document.createElement('div')
      );
      container.dataset.layerRoot = '';
      Layer.__layerRootContainer = container;
    }
    return Layer.__layerRootContainer;
  }
  static set layerRootContainer(container) {
    Layer.__layerRootContainer = container;
  }
  static addElement(element) {
    if (element) {
      const layerRootContainer = Layer.layerRootContainer;
      const container = layerRootContainer.appendChild(
        document.createElement('div')
      );
      const instance = ReactDOM.render(element, container);
      Layer.__layerMap.set(instance._reactInternalInstance, container);
      return instance;
    }
  }

  static removeElement(instance) {
    if (instance && instance._reactInternalInstance) {
      const container = Layer.__layerMap.get(instance._reactInternalInstance);
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
        Layer.__layerMap.delete(instance._reactInternalInstance);
      }
    }
  }

  static propTypes = {
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.el);
    }
  }

  el;

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}
