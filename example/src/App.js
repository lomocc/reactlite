/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Button, Icon, Layer } from 'reactlite';
import Benchmark from './Benchmark';
import LayerExample from './LayerExample';
import ReviewExample from './ReviewExample';

class Demo extends Component {
  render() {
    return (
      <Box
        as="h5"
        tag="p"
        widthRatio={1}
        mdWidthRatio={0.8}
        backgroundColor="#f00"
        mdBackgroundColor="#aaa"
      >
        <Box shape="pill" backgroundColor="#f90" className="Box">
          <Button>
            <Icon marginRight={1} />
            按钮
          </Button>
          <Button>
            <Icon />
            <Icon />
            <Icon />
            按钮
          </Button>
        </Box>
        <Button shape="pill" backgroundColor="red" hoverBackgroundColor="green">
          Buttonpill
        </Button>
        <Box paddingX={4} display="flex">
          <Icon />
          <Icon src="https://developer.mozilla.org/static/arrows/chevron-right.3b8652b57659.svg" />
        </Box>
        <Box paddingX={4}>
          <LayerExample />
          <Layer.Container />
          <ReviewExample />
          <Benchmark />
        </Box>
      </Box>
    );
  }
}

export default Demo;
