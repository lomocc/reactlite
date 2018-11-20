import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import parseStyleProps from './utils/parseStyleProps';

const propsToStyle = {};
const LinkBase = React.forwardRef((props, ref) => {
  const parsedProps = parseStyleProps(props, propsToStyle);
  return (
    <Text ref={ref} tag="a" role="link" data-class="Link" {...parsedProps} />
  );
});

const Link = styled(LinkBase)`
  border: unset;
  display: inline-flex;
  position: relative;
  appearance: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 2em;
  // height: 2em;
  padding: 0 0.68em;
  flex: none;
  user-select: none;
  white-space: nowrap;
  border-color: #007eff;
  outline: none;
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
  &,
  &:link,
  &:visited {
    filter: none;
  }
  &:hover,
  &:focus {
    opacity: 0.5;
    transition: opacity 0.15s ease-in;
  }
  &:active,
  &.active {
  }
`;
Link.defaultProps = {
  tabIndex: 0,
  inline: true
};

export default Link;
