import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 层组件
 *
 * in App:
 * <Layer name="layerName"/>
 *
 * let ref = Layer.addElement('layerName', <Tooltip>);
 * Layer.removeElement(ref);
 */
const __layerMap = new Map();
function getLayer(name) {
  return __layerMap.get(name || null);
}
function addLayer(name, layer) {
  __layerMap.set(name || null, layer);
}
function removeLayer(name) {
  __layerMap.delete(name || null);
}
function addElement() {
  const [name, elementOrType, props, ...elementChildren] = arguments;
  if (name == null || typeof name === 'string') {
    const layer = getLayer(name);
    const ref = React.createRef();
    layer.setState(({ children }) => {
      const key = children.length;
      const element = React.isValidElement(elementOrType)
        ? React.cloneElement(elementOrType, { key, ref })
        : React.createElement(
            elementOrType,
            { ...props, key, ref },
            ...elementChildren
          );
      return {
        children: [...children, element]
      };
    });
    return ref;
  } else {
    return addElement(null, ...arguments);
  }
}

function removeElement() {
  const [name, refOrCurrent] = arguments;
  if (name == null || typeof name === 'string') {
    const layer = getLayer(name);
    layer.setState(({ children }) => ({
      children: children.filter(
        element =>
          element.ref !== refOrCurrent && element.ref.current !== refOrCurrent
      )
    }));
  } else {
    removeElement(null, ...arguments);
  }
}

export default class Layer extends React.Component {
  static addElement = addElement;

  static removeElement = removeElement;

  constructor(props) {
    super(props);
    this.state = { children: [] };
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.el);
    }
    let { name } = this.props;
    addLayer(name, this);
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.el);
    }
    let { name } = this.props;
    removeLayer(name);
  }

  el;

  render() {
    const { children } = this.props;
    const { children: stateChildren } = this.state;
    return ReactDOM.createPortal(children || stateChildren, this.el);
  }
}
