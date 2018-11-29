import React from 'react';
import { Box } from './primitives';

const WebPEnabled = (function() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return anvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
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
      backgroundImage={`url('${WebPEnabled ? webp || src : src}')`}
    />
  );
};

export default Image;
