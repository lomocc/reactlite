/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Button, Popover, State, Tooltip } from 'reactlite';

class Demo extends Component {
  render() {
    return (
      <Box>
        <Box title="base" backgroundColor="#f90">
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

          <Box
            onClick={() => {
              console.log('Button1 onClick');
            }}
          >
            Box onCLick
          </Box>
        </Box>
        <Box height={200} backgroundColor="#236">
          <State state={{ visible: false }}>
            {({ state: { visible }, setState }) => {
              console.log('visible', visible);
              return (
                <React.Fragment>
                  <Button
                    onClick={() => {
                      console.log('Button onClick');
                      setState({ visible: !visible });
                    }}
                    id="button1"
                  >
                    State Popover1
                  </Button>
                  {visible && 'visible'}
                  {visible && (
                    <Popover placement="auto" target="#button1">
                      content="Popover1 content"
                    </Popover>
                  )}
                </React.Fragment>
              );
            }}
          </State>
          <State state={{ visible: false }}>
            {({ state: { visible }, setState }) => {
              console.log('visible', visible);
              return (
                <React.Fragment>
                  <Button
                    onClick={() => {
                      console.log('Button onClick');
                      setState({ visible: !visible });
                    }}
                    id="button2"
                  >
                    State Popover1
                  </Button>
                  {visible && 'visible'}
                  {visible && (
                    <Popover placement="bottom" target="#button2">
                      content="Popover1 content"
                    </Popover>
                  )}
                </React.Fragment>
              );
            }}
          </State>
        </Box>
        <Box>
          <Box backgroundColor="#eee">
            {['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((size, index) => (
              <Box
                is="input"
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
