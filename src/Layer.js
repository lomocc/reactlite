import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 层组件
 *
 * 方式 1
 * showLayer && <Layer><div>Layer Content</div></Layer>
 *
 * 方式 2
 * <Layer.Placeholder/>
 * let element = <Tooltip/>;
 * Layer.mount(element);
 * Layer.unmount(element);
 *
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
const __elementMap = new Map();
let __elementKey = 0;

function mount(name, element) {
  if (typeof name === 'string') {
    const unmountSelf = () => unmount(name, element);
    if (!__layerMap.has(name)) {
      console.error(`[Layer] 需要先添加 <Layer.Placeholder/>`);
    }
    if (__elementMap.has(element)) {
      console.warn(`[Layer] 重复的 element: `, element);
    }
    const ref = React.createRef();
    __elementMap.set(element, { ref });
    const layer = getLayer(name);

    let props = {
      ref,
      unmount: unmountSelf
    };
    if (element.key == null) {
      props.key = `layer${__elementKey++}`;
    }
    layer.setState(({ children }) => ({
      children: children
        .filter(element => element.ref !== ref)
        .concat([React.cloneElement(element, props)])
    }));
    return unmountSelf;
  } else {
    return mount(__defaultName, name);
  }
}
function unmount(name, element) {
  if (typeof name === 'string') {
    if (__elementMap.has(element)) {
      const { ref } = __elementMap.get(element);
      __elementMap.delete(element);
      const layer = getLayer(name);
      layer.setState(({ children }) => ({
        children: children.filter(element => element.ref !== ref)
      }));
    }
  } else {
    unmount(__defaultName, name);
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
Layer.mount = mount;
Layer.unmount = unmount;
Layer.Placeholder = Placeholder;
export default Layer;
