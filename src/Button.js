import React from 'react';
import { Box } from './primitives';

class Button extends React.Component {
  render() {
    return <Box is="button" {...this.props} />;
  }
}

export default Box;
