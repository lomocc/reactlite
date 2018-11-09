import React from 'react';
import CSSProps from './utils/CSSProps';
import ExtraCSSProps from './utils/ExtraCSSProps';

const mapStyleProps = (styleProps, { style, ...props }) => {
  const newStyle = {};
  const newProps = {};
  for (let name in props) {
    let value = props[name];

    if (styleProps[name]) {
      Object.assign(newStyle, styleProps[name](value));
    } else if (CSSProps[name]) {
      Object.assign(newStyle, { [name]: value });
    } else {
      Object.assign(newProps, { [name]: value });
    }
  }
  newProps.style = Object.assign(newStyle, style);
  return newProps;
};

const Box = ({ as = 'div', ...props }) =>
  React.createElement(as, mapStyleProps(ExtraCSSProps, props));

export default Box;
