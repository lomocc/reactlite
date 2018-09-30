/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Text, Button } from 'reactlite';
class Demo extends Component {
  render() {
    return (
      <Box>
        <Box>
          <Box display="flex" flexDirection="column">
            {new Array(9).fill(0).map((_, index) => (
              <Text size={100 * (index + 1)}>
                测试文字 size=
                {100 * (index + 1)}
              </Text>
            ))}
          </Box>
          <Box backgroundColor="#eee">
            {new Array(9).fill(0).map((_, index) => (
              <Button
                size={100 * (index + 1)}
                backgroundColor={
                  '#' +
                  Math.random()
                    .toString(16)
                    .substr(2, 6)
                }
              >
                测试按钮 size=
                {100 * (index + 1)}
              </Button>
            ))}
          </Box>
          <Box backgroundColor="#235">
            <Button
              size={500}
              width={160}
              height={160}
              shape="circle"
              backgroundColor={
                '#' +
                Math.random()
                  .toString(16)
                  .substr(2, 6)
              }
            >
              circle
            </Button>
            {[
              'square',
              'rounded',
              'pill',
              'roundedTop',
              'roundedBottom',
              'roundedLeft',
              'roundedRight'
            ].map((shape, index) => (
              <Button
                margin={4}
                size={500}
                inline
                shape={shape}
                backgroundColor={
                  '#' +
                  Math.random()
                    .toString(16)
                    .substr(2, 6)
                }
              >
                测试按钮 shape=
                {shape}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Demo;
