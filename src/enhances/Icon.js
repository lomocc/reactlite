import React from 'react';
import { Box } from '../primitives';

/**
 * 图标组件
 */
const Icon = ({ width, height, path, sourceWidth, sourceHeight, ...props }) => {
  const iconWidth = width || height || 16;
  const iconHeight = height || width || 16;

  const iconSourceWidth = sourceWidth || sourceHeight || 1024;
  const iconSourceHeight = sourceHeight || sourceWidth || 1024;

  return (
    <Box
      is="svg"
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
};
Icon.defaultProps = {
  path: 'M0 0L1024 0L1024 1024L0 1024z'
};

export default Icon;
