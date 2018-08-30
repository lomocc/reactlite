import React from 'react';
import PropTypes from 'prop-types';
import { ifNotProp, withProp, switchProp } from 'styled-tools';
import { responsiveProp, withResponsiveProp } from './utils/styledProps';
import styled, { css } from 'styled-components';

import as from './utils/as';

const Component = ({ as, ...props }) => {
  return React.createElement(as, props);
};
Component.propTypes = {
  as: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
const borderRadius = '8px';
const Box = styled(Component)`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  ${withProp('theme.Box', responsiveProp)};
  &&&{
  ${withResponsiveProp({
    column: value => ({ width: `${value * 100}%` }),
    aspectRatio: value => ({
      paddingBottom: `${(1 / value) * 100}%`,
      height: 0
    })
  })}
  ${switchProp('shape', {
    square: css`
      border-radius: 0;
    `,
    circle: css`
      border-radius: 50%;
    `,
    pill: css`
      border-radius: 999px;
    `,
    rounded: css`
      border-radius: ${borderRadius};
    `,
    roundedTop: css`
      border-radius: ${borderRadius} ${borderRadius} 0 0;
    `,
    roundedRight: css`
      border-radius: 0 ${borderRadius} ${borderRadius} 0;
    `,
    roundedBottom: css`
      border-radius: 0 0 ${borderRadius} ${borderRadius};
    `,
    roundedLeft: css`
      border-radius: ${borderRadius} 0 0 ${borderRadius};
    `
  })};
  ${ifNotProp(
    'visible',
    css`
      display: none;
    `
  )}
  ${ifNotProp(
    'mouseEnabled',
    css`
      pointer-events: none;
    `
  )}
  ${withProp(
    'column',
    column =>
      column &&
      css`
        width: ${column * 100}%;
      `
  )}
  }
  }
`;

const asTypes = [PropTypes.func, PropTypes.string];

// @ts-ignore
Box.propTypes = {
  as: PropTypes.oneOfType([
    ...asTypes,
    PropTypes.arrayOf(PropTypes.oneOfType(asTypes))
  ]),
  column: PropTypes.number,
  aspectRatio: PropTypes.number,

  static: PropTypes.bool,
  absolute: PropTypes.bool,
  fixed: PropTypes.bool,
  relative: PropTypes.bool,
  sticky: PropTypes.bool,

  block: PropTypes.bool,
  flexbox: PropTypes.bool,
  inline: PropTypes.bool,
  inlineBlock: PropTypes.bool,
  inlineFlex: PropTypes.bool
};
Box.defaultProps = {
  visible: true,
  mouseEnabled: true
};
export default as('div')(Box);
