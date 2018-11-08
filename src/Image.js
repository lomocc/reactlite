import React from 'react';
import Tag from './Tag';

class Image extends React.Component {
  render() {
    let {
      src,
      contain = false,
      cover = false,
      children,
      backgroundColor,
      color,
      natural,
      ...others
    } = this.props;
    return (
      <Tag
        role="img"
        width="100%"
        height="100%"
        backgroundPosition="center"
        {...others}
        backgroundRepeat="no-repeat"
        backgroundSize={contain ? 'contain' : cover ? 'cover' : '100% 100%'}
        backgroundColor={backgroundColor || color}
        backgroundImage={`url('${src}')`}
      >
        {children}
      </Tag>
    );
  }
}
export default Image;
