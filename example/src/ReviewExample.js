/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Button, Input, Link, Popover, Text, Tooltip } from 'reactlite';

class Demo extends Component {
  render() {
    return (
      <Box>
        <Box
          title="base"
          backgroundColor="#f90"
          style={{ backgroundColor: '#f00', fontSize: 54 }}
        >
          <Tooltip content="Tooltip1 content" placement="bottom">
            <Button>Tooltip 1</Button>
          </Tooltip>
          <Tooltip content="Tooltip2 content">
            <Button>Tooltip 2</Button>
          </Tooltip>
          <Tooltip
            content="Tooltip3 content"
            placement="bottom"
            trigger="click"
          >
            <Button>Tooltip 3</Button>
          </Tooltip>
          <Tooltip
            content="Tooltip4 contentTooltip4 contentTooltip4 content"
            placement="right"
          >
            <Button>Tooltip 4</Button>
          </Tooltip>
          <Link
            color="black"
            ref={ref => {
              console.log(ref);
            }}
          >
            Link
          </Link>
          <Button
            disabled
            inline
            ref={ref => {
              console.log(ref);
            }}
          >
            Button disabled
          </Button>
        </Box>
        <Box height={200} backgroundColor="#236">
          <Popover content="Popover1 content" placement="bottom">
            <Link>Popover state setState</Link>
          </Popover>
          <Popover content="Popover1 content" placement="bottom">
            <Button>Popover1</Button>
          </Popover>
          <Popover
            content={
              <Box background="#FFC107">
                外层 Popover
                <Popover
                  content={
                    <Box background="#FFC107">
                      内层 Popover
                      <Button backgroundColor="#f90" inline>
                        Popover2
                      </Button>
                    </Box>
                  }
                  placement="top"
                >
                  <Button backgroundColor="#f90" inline>
                    Popover2
                  </Button>
                </Popover>
              </Box>
            }
            placement="top"
          >
            <Button backgroundColor="#f90" inline>
              Popover2
            </Button>
          </Popover>
        </Box>
        <Box>
          <Box backgroundColor="#eee">
            {['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((size, index) => (
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
            {['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((size, index) => (
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
                测试Link size={size}
              </Link>
            ))}
          </Box>
          <Box display="flex" flexDirection="column">
            {['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((size, index) => (
              <Text size={size}>测试文字 size={size}</Text>
            ))}
          </Box>
          <Box display="flex" flexDirection="column">
            {['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((size, index) => (
              <Text tag="h1" size={size} margin={1}>
                测试文字 size={size}
              </Text>
            ))}
          </Box>
          <Box backgroundColor="#eee">
            {['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((size, index) => (
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
