import React from 'react';
import { Box } from './primitives';

const Image = props => {
  let {
    src,
    contain = false,
    cover = false,
    fit = false,
    repeat = false,
    ...others
  } = props;
  return (
    <Box
      role="img"
      width="100%"
      height="100%"
      backgroundPosition="center"
      {...others}
      backgroundRepeat={repeat ? 'repeat' : 'no-repeat'}
      backgroundSize={
        contain ? 'contain' : cover ? 'cover' : fit ? '100% 100%' : 'unset'
      }
      backgroundImage={`url('${src}')`}
    />
  );
};

export default Image;
