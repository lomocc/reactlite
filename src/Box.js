import React from 'react';
import styled from 'styled-components';
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

const BoxBase = React.forwardRef(({ tag = 'div', ...props }, ref) =>
  React.createElement(tag, { ...mapStyleProps(props), ref })
);

const Box = styled(BoxBase)`
  margin: unset;
  padding: unset;
  border: unset;
  background: unset;
  font: unset;
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
`;

export default Box;
