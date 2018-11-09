/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Button, Input, Link, Popover, Text } from 'reactlite';
class Demo extends Component {
  render() {
    return (
      <Box>
        <Box
          title="base"
          data-aa="aaa"
          backgroundColor="#f90"
          style={{ backgroundColor: '#f00', fontSize: 54 }}
        >
          <Link color="#f90">Link</Link>
        </Box>
        <Box height={400} backgroundColor="#eee">
          <Popover content="Popover1 content" placement="bottom">
            <button>Popover1</button>
          </Popover>
          <Popover
            content={<Box background="#FFC107">Popover2 content</Box>}
            placement="top"
          >
            <Button backgroundColor="#f90" inline>
              Popover2
            </Button>
          </Popover>
        </Box>
        <Box>
          <Box backgroundColor="#eee">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
              <Input
                size={size}
                color={
                  '#' +
                  Math.random()
                    .toString(16)
                    .substr(2, 6)
                }
              />
            ))}
          </Box>
          <Box backgroundColor="#eee">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
              <Link
                size={size}
                href="#"
                color={
                  '#' +
                  Math.random()
                    .toString(16)
                    .substr(2, 6)
                }
              >
                测试按钮 size={size}
              </Link>
            ))}
          </Box>
          <Box display="flex" flexDirection="column">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
              <Text size={size}>测试文字 size={size}</Text>
            ))}
          </Box>
          <Box display="flex" flexDirection="column">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
              <Text as="h1" size={size} margin={1}>
                测试文字 size={size}
              </Text>
            ))}
          </Box>
          <Box backgroundColor="#eee">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
              <Button
                size={size}
                backgroundColor={
                  '#' +
                  Math.random()
                    .toString(16)
                    .substr(2, 6)
                }
              >
                测试按钮 size={size}
              </Button>
            ))}
          </Box>
          <Box backgroundColor="#235">
            <Button
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
