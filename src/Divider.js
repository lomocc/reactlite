import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import { parseStyleProps } from './utils/styledProps';

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

const DividerBase = styled(Box)`
  border-color: currentColor;
  border-style: solid;
  opacity: 0.2;
`;
const Divider = props => {
  const parsedProps = parseStyleProps(props, propsToStyle);
  return (
    <DividerBase as="hr" role="divider" className="Divider" {...parsedProps} />
  );
};

Divider.propTypes = {
  vertical: PropTypes.bool
};

export default Divider;
