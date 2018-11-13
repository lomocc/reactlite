/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Divider, Icon, Layer, Link } from 'reactlite';
import Benchmark from './Benchmark';
import LayerExample from './LayerExample';
import ReviewExample from './ReviewExample';

class Demo extends Component {
  render() {
    return (
      <div>
        <Box paddingX={4} display="flex">
          <Icon />
          <Icon src="https://developer.mozilla.org/static/arrows/chevron-right.3b8652b57659.svg" />
          <Link href="www.google.com" margin={4}>
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
      </div>
    );
  }
}

export default Demo;
