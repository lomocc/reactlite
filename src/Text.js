import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import as from './utils/as';
import { omitResponsiveProp, withResponsiveProp } from './utils/styledProps';

const sizeStyles = {
  xl: {
    fontSize: '2em'
  },
  lg: {
    fontSize: '1.75em'
  },
  md: {
    fontSize: '1.5em'
  },
  sm: {
    fontSize: '1.25em'
  },
  xs: {
    fontSize: '1em'
  }
};
const responsiveProps = {
  italic: value => value && { fontStyle: 'italic' },
  bold: value => value && { fontWeight: 'bold' },
  inline: value => value && { display: 'inline-block' },
  nowrap: value =>
    value && {
      maxWidth: '100%',
      whiteSpace: 'nowrap'
    },
  ellipsis: value =>
    value && {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
  size: value => sizeStyles[value]
};
const Base = props =>
  React.createElement(Box, omitResponsiveProp(responsiveProps, props));

const Text = styled(Base)`
  line-height: unset;
  margin: unset;
  ${withResponsiveProp(responsiveProps)};
`;
Text.defaultProps = {
  size: 'xs'
};
Text.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  // 不换行
  nowrap: PropTypes.bool,
  // 省略号
  ellipsis: PropTypes.bool
};
export default as('div')(Text);
