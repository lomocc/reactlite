import CSSProps from './CSSProps';
import validAttr from './validAttr';
import uniq from './uniq';

function getComponentName(component) {
  if (typeof component === 'string') {
    return component;
  }
  return component.displayName || component.name;
}

export default getComponentName;

function pickCSSProps(props) {
  let style = {};
  for (const k in props) {
    if (k in CSSProps) {
      style[k] = props[k];
    }
  }
  return style;
}
function pickHTMLProps(props) {
  const filteredProps = {};
  for (const k in props) {
    if (validAttr(k)) {
      filteredProps[k] = props[k];
    }
  }
  return filteredProps;
}
function parseClassName(className) {
  return className && uniq(className.split(' ')).join(' ');
}

export { pickCSSProps, pickHTMLProps, parseClassName, getComponentName };
