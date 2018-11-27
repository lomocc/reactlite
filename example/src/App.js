/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Button, Icon, Layer } from 'reactlite';
import Benchmark from './Benchmark';
import LayerExample from './LayerExample';
import ReviewExample from './ReviewExample';

let Container = props => (
  <Box
    mediaQueries={{
      sm: 'screen and (max-width: 640px)',
      lg: 'screen and (min-width: 1280px)'
    }}
    {...props}
  />
);

class Demo extends Component {
  render() {
    return (
      <Box widthRatio={1} aspectRatio={1}>
        <Box
          props={{ shape: '123' }}
          data-abc="abc"
          title="title"
          onClick={() => {
            alert('onClick');
          }}
          shape="pill"
          smShape="rounded"
          backgroundColor="#f00"
          mediaQueries={{
            sm: 'screen and (max-width: 640px)',
            lg: 'screen and (min-width: 1280px)'
          }}
          color="red"
          smColor="blue"
          lgColor="green"
        >
          Box
        </Box>
        <Container color="red" smColor="blue" lgColor="green" padding={20}>
          Container
        </Container>
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
