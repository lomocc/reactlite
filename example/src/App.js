/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Layer } from 'reactlite';
import Benchmark from './Benchmark';
import LayerExample from './LayerExample';
import ReviewExample from './ReviewExample';

console.log('DEMO', Box);
class Demo extends Component {
  render() {
    return (
      <div>
        111
        <Box>
          <div>div</div>
          <LayerExample />
          <Layer.Placeholder />
          <ReviewExample />
          <Benchmark />
        </Box>
      </div>
    );
  }
}

export default Demo;
