import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import parseStyleProps from './utils/parseStyleProps';

const propsToStyle = {
  // inline: value => !value && { width: '100%' }
};

const ButtonBase = React.forwardRef((props, ref) => {
  const parsedProps = parseStyleProps(props, propsToStyle);
  return <Text ref={ref} tag="button" data-class="Button" {...parsedProps} />;
});
const Button = styled(ButtonBase)`
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
  border-color: #007eff;
  outline: none;
  text-decoration: none;
  & > * {
    margin-right: 4px;
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
  &:not(button):not(select):not(input) {
    display: inline-grid;
    grid-gap: 0.68em;
    grid-auto-flow: column;
    align-content: center;
  }
  &[disabled] {
    pointer-events: none;
    color: #8e8e8e;
    &:after {
      display: block;
    }
  }
  &:hover,
  &:focus {
    box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.1);
  }
  &:active {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
  }
  &[disabled] {
    box-shadow: inset 0 0 999em #efefef;
  }
`;

Button.defaultProps = {
  tabIndex: 0,
  inline: true
};
export default Button;
