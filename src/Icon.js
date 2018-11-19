import React from 'react';
import Box from './Box';

/**
 * 图标组件
 */
const Icon = React.forwardRef(
  ({ src, width, height, path, sourceWidth, sourceHeight, ...props }, ref) => {
    const iconWidth = width || height || 16;
    const iconHeight = height || width || 16;

    const iconSourceWidth = sourceWidth || sourceHeight || 1024;
    const iconSourceHeight = sourceHeight || sourceWidth || 1024;

    if (src) {
      return (
        <Box
          ref={ref}
          tag="img"
          role="img"
          width={iconWidth}
          height={iconHeight}
          {...props}
          src={src}
        />
      );
    } else {
      return (
        <Box
          ref={ref}
          tag="svg"
          role="img"
          width={iconWidth}
          height={iconHeight}
          viewBox={`0 0 ${iconSourceWidth} ${iconSourceHeight}`}
          fill="currentColor"
          strokeWidth={0}
          verticalAlign="middle"
          {...props}
        >
          <path d={path} />
        </Box>
      );
    }
  }
);
Icon.defaultProps = {
  path: 'M0 0L1024 0L1024 1024L0 1024z'
};

export default Icon;
