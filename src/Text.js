import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import parseStyleProps from './utils/parseStyleProps';

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
  inline: false
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
