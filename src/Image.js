import React from 'react';
import { Box } from './primitives';

const webpSupported = (function() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').substring(5, 15) === 'image/webp';
})();

const Image = props => {
  let {
    src,
    webp,
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
      backgroundImage={`url('${webpSupported ? webp || src : src}')`}
    />
  );
};

export default Image;
