import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import { parseStyleProps } from './utils/styledProps';

const handleKeyPress = e => {
  if (e.charCode === 32 || e.charCode === 13) {
    e.preventDefault();
    e.target.click();
  }
};
const propsToStyle = {
  inline: value => !value && { width: '100%' }
};
const ButtonBase = styled(Text)`
  border: unset;
  display: inline-flex;
  position: relative;
  appearance: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 2em;
  height: 2em;
  padding: 0 0.68em;
  flex: none;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  outline: none;
  &:hover,
  &:focus {
    box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.1);
  }
  &:active,
  &.active {
    box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.2);
  }
  &:after {
    display: none;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, 0.35);
  }
  &[disabled] {
    pointer-events: none;
    color: #8e8e8e;
    box-shadow: inset 0 0 999em #efefef;
    &:after {
      display: block;
    }
  }
  &:not(button):not(select):not(input) {
    display: inline-grid;
    grid-gap: 0.68em;
    grid-auto-flow: column;
    align-content: center;
  }
`;

const Button = props => {
  const parsedProps = parseStyleProps(props, propsToStyle);
  return (
    <ButtonBase as="button" role="button" className="Button" {...parsedProps} />
  );
};
Button.defaultProps = {
  tabIndex: 0,
  onKeyPress: handleKeyPress,
  shape: 'rounded',
  inline: true
};
export default Button;
