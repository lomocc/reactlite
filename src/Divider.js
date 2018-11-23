import React from 'react';
import { Box } from './primitives';

const Divider = props => {
  let { vertical = false, ...others } = props;

  let dividerStyle = vertical
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
      };
  return (
    <Box
      is="hr"
      borderColor="currentColor"
      borderStyle="solid"
      opacity="0.2"
      role="divider"
      {...dividerStyle}
      {...others}
    />
  );
};

export default Divider;
