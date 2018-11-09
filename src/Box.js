import React from 'react';
import CSSProps from './utils/CSSProps';
import ExtraCSSProps from './utils/ExtraCSSProps';

const mapStyleProps = ({ style, ...props }) => {
  const newStyle = {};
  const newProps = {};
  for (let name in props) {
    let value = props[name];

    if (ExtraCSSProps[name]) {
      Object.assign(newStyle, ExtraCSSProps[name](value));
    } else if (CSSProps[name]) {
      Object.assign(newStyle, { [name]: value });
    } else {
      Object.assign(newProps, { [name]: value });
    }
  }
  newProps.style = Object.assign(newStyle, style);
  return newProps;
};

const Box = ({ as = 'div', ...props }) => {
  console.log('Box', props, mapStyleProps(props));
  return React.createElement(as, mapStyleProps(props));
};

export default Box;
