/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Text, Button, Layer } from 'reactlite';
import ReviewExample from './ReviewExample';
import LayerExample from './LayerExample';
class Demo extends Component {
  render() {
    return (
      <Box>
        <LayerExample />
        <Layer.Placeholder />
        {/* <ReviewExample /> */}
      </Box>
    );
  }
}

export default Demo;
