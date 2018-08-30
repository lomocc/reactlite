import React from 'react';
import PropTypes from 'prop-types';
import { withProp, prop } from 'styled-tools';
import { withResponsiveProp } from './utils/styledProps';
import styled from 'styled-components';

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
  ${withProp('theme.Box', withResponsiveProp())};
  &&&{
  ${withResponsiveProp({
    column: value => ({ width: `${value * 100}%` }),
    aspectRatio: value => ({
      paddingBottom: `${(1 / value) * 100}%`,
      height: 0
    }),
    visible: value => !value && { display: 'none' },
    mouseEnabled: value => !value && { pointerEvents: 'none' },
    shape: value =>
      prop(value)({
        square: { bordeRadius: 0 },
        circle: { bordeRadius: '50%' },
        pill: { bordeRadius: '999px' },
        rounded: { bordeRadius: `${borderRadius}` },
        roundedTop: { bordeRadius: `${borderRadius} ${borderRadius} 0 0` },
        roundedRight: {
          bordeRadius: `0 ${borderRadius} ${borderRadius} 0`
        },
        roundedBottom: {
          bordeRadius: `0 0 ${borderRadius} ${borderRadius}`
        },
        roundedLeft: { bordeRadius: `${borderRadius} 0 0 ${borderRadius}` }
      })
  })}
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
