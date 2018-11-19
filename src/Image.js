import React from 'react';
import Box from './Box';

const Image = React.forwardRef((props, ref) => {
  let {
    src,
    contain = false,
    cover = false,
    repeat = false,
    fit = false,
    children,
    backgroundColor,
    color,
    ...others
  } = props;
  return (
    <Box
      ref={ref}
      role="img"
      data-class="Image"
      width="100%"
      height="100%"
      backgroundPosition="center"
      {...others}
      backgroundRepeat={repeat ? 'repeat' : 'no-repeat'}
      backgroundSize={
        contain ? 'contain' : cover ? 'cover' : fit ? '100% 100%' : 'unset'
      }
      backgroundColor={backgroundColor || color}
      backgroundImage={`url('${src}')`}
    >
      {children}
    </Box>
  );
});

export default Image;
