import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import Text from './Text';
import as from './utils/as';
import { omitResponsiveProp, withResponsiveProp } from './utils/styledProps';

const handleKeyPress = e => {
  if (e.charCode === 32 || e.charCode === 13) {
    e.preventDefault();
    e.target.click();
  }
};
const responsiveProps = {
  inline: value => !value && { width: '100%' }
};
const Base = props =>
  React.createElement(Text, omitResponsiveProp(responsiveProps, props));
const Button = styled(Base)`
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
  ${prop('theme.Button')};
  ${withResponsiveProp(responsiveProps)};
`;

Button.defaultProps = {
  role: 'button',
  tabIndex: 0,
  onKeyPress: handleKeyPress,
  shape: 'rounded',
  inline: true
};
Button.propTypes = {
  shape: PropTypes.oneOf([
    'square',
    'rounded',
    'pill',
    'circle',
    'roundedTop',
    'roundedBottom',
    'roundedLeft',
    'roundedRight'
  ])
};
export default as('button')(Button);
