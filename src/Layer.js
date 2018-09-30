import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 层组件
 *
 * in App:
 * <Layer.Placeholder name="layerName"/>
 *
 * let ref = Layer.addElement('layerName', <Tooltip>);
 * Layer.removeElement(ref);
 */
const __layerMap = new Map();
const __defaultName = 'default';
function getLayer(name) {
  return __layerMap.get(name);
}
function addLayer(name, layer) {
  if (__layerMap.has(name)) {
    console.warn(`[Layer] 重复的 name: ${name}`);
  }
  __layerMap.set(name, layer);
}
function removeLayer(name) {
  __layerMap.delete(name);
}
function addElement() {
  const [name, elementOrType, props, ...elementChildren] = arguments;
  if (typeof name === 'string') {
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
    return addElement(__defaultName, ...arguments);
  }
}

function removeElement() {
  const [name, refOrCurrent] = arguments;
  if (typeof name === 'string') {
    const layer = getLayer(name);
    layer.setState(({ children }) => ({
      children: children.filter(
        element =>
          element.ref !== refOrCurrent && element.ref.current !== refOrCurrent
      )
    }));
  } else {
    removeElement(__defaultName, ...arguments);
  }
}
class Layer extends React.Component {
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
class Placeholder extends React.Component {
  static defaultProps = {
    name: __defaultName
  };
  constructor(props) {
    super(props);
    this.state = { children: [] };
  }
  componentDidMount() {
    let { name } = this.props;
    addLayer(name, this);
  }
  componentWillUnmount() {
    let { name } = this.props;
    removeLayer(name);
  }
  render() {
    const { children } = this.state;
    return <Layer children={children} />;
  }
}
Layer.addElement = addElement;
Layer.removeElement = removeElement;
Layer.Placeholder = Placeholder;
export default Layer;
