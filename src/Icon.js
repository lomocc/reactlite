import React from 'react';
import Box from './Box';

/**
 * 图标组件
 */
class Icon extends React.Component {
  static defaultProps = {
    path: 'M0 0L1024 0L1024 1024L0 1024z'
  };
  render() {
    let {
      src,
      width,
      height,
      path,
      sourceWidth,
      sourceHeight,
      ...props
    } = this.props;

    const iconWidth = width || height || 16;
    const iconHeight = height || width || 16;

    const iconSourceWidth = sourceWidth || sourceHeight || 1024;
    const iconSourceHeight = sourceHeight || sourceWidth || 1024;

    if (src) {
      return (
        <Box
          as="img"
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
          as="svg"
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
}
export default Icon;
