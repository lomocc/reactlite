/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Icon,
  Layer,
  Link,
  Text
} from 'reactlite';
import Benchmark from './Benchmark';
import LayerExample from './LayerExample';
import ReviewExample from './ReviewExample';

class Demo extends Component {
  render() {
    return (
      <Container
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
        <Text shape="pill" backgroundColor="red" className="Text123">
          Text
        </Text>
        <Button shape="pill">Button</Button>
        <Box paddingX={4} display="flex">
          <Icon />
          <Icon src="https://developer.mozilla.org/static/arrows/chevron-right.3b8652b57659.svg" />
          <Link
            href="www.google.com"
            margin={7}
            ref={ref => {
              console.log(ref);
            }}
          >
            LinkLink
          </Link>
          <Divider vertical />
          <Link color="red" href="www.google.com" margin={4}>
            Link
          </Link>
          <Divider vertical />
          <Link color="red" href="www.google.com" margin={4}>
            Link
          </Link>
          <Divider vertical />
          <Link color="red" href="www.google.com" margin={4}>
            Link
          </Link>
        </Box>
        <Box paddingX={4}>
          <Link href="www.google.com" margin={4}>
            LinkLinkLinkLinkLinkLinkLinkLinkLinkLinkLinkLinkLinkLink
          </Link>
          <Divider />
          <Link color="red" href="www.google.com" margin={4}>
            LinkLinkLinkLinkLinkLinkLinkLinkLinkLinkLinkLinkLinkLink
          </Link>
          <LayerExample />
          <Layer.Placeholder />
          <ReviewExample />
          <Benchmark />
        </Box>
      </Container>
    );
  }
}

export default Demo;
