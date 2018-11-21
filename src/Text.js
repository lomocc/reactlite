import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import parseStyleProps from './utils/parseStyleProps';

const sizeStyles = {
  xxl: {
    fontSize: '3rem'
  },
  xl: {
    fontSize: '2.25rem'
  },
  lg: {
    fontSize: '1.5rem'
  },
  md: {
    fontSize: '1.25rem'
  },
  sm: {
    fontSize: '1rem'
  },
  xs: {
    fontSize: '0.875rem'
  },
  xxs: {
    fontSize: '0.75rem'
  }
};
const propsToStyle = {
  italic: value => value && { fontStyle: 'italic' },
  bold: value => value && { fontWeight: 'bold' },
  inline: value => (value ? { display: 'inline-flex' } : { width: '100%' }),
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

const TextBase = React.forwardRef((props, ref) => {
  const parsedProps = parseStyleProps(props, propsToStyle);
  return <Box ref={ref} tag="span" data-class="Text" {...parsedProps} />;
});

const Text = styled(TextBase)`
  line-height: unset;
  margin: unset;
`;

Text.defaultProps = {
  size: 'xs',
  inline: true
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
export default Text;
