import React from 'react';
import Box from './Box';

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
      <Box
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
      </Box>
    );
  }
}
export default Image;
