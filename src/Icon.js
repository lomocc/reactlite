import React from 'react';
import { withTheme } from 'styled-components';
import Tag from './Tag';

/**
 * 图标组件
 */
class Icon extends React.Component {
  render() {
    let {
      src,
      icon,
      size,
      width,
      height,
      theme,
      path,
      sourceSize = 1024,
      ...props
    } = this.props;
    if (!theme.IconPaths) {
      console.warn('要使用 Icon 必须设置 theme.IconPaths');
    }
    size = size || width || height || 16;
    if (icon) {
      path = path || theme.IconPaths[icon];
      return (
        <Tag
          as="svg"
          role="img"
          height={size}
          width={size}
          viewBox={`0 0 ${sourceSize} ${sourceSize}`}
          fill="currentColor"
          strokeWidth={0}
          verticalAlign="middle"
          {...props}
        >
          <path d={path} />
        </Tag>
      );
    } else if (src) {
      return (
        <Tag
          as="img"
          role="img"
          height={size}
          width={size}
          {...props}
          src={src}
        />
      );
    } else {
      return <Tag role="img" height={size} width={size} {...props} />;
    }
  }
}
export default withTheme(Icon);
