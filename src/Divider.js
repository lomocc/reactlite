import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import parseStyleProps from './utils/parseStyleProps';

const propsToStyle = {
  vertical: value =>
    value
      ? {
          marginTop: '0 1em',
          minHeight: '100%',
          width: 0,
          borderWidth: '0 0 0 1px'
        }
      : {
          margin: '1em 0',
          height: 0,
          borderWidth: '1px 0 0 0'
        }
};

const DividerBase = React.forwardRef((props, ref) => {
  const parsedProps = parseStyleProps(props, propsToStyle);
  return <Box tag="hr" role="divider" className="Divider" {...parsedProps} />;
});
const Divider = styled(DividerBase)`
  border-color: currentColor;
  border-style: solid;
  opacity: 0.2;
`;
Divider.propTypes = {
  vertical: PropTypes.bool
};

export default Divider;
