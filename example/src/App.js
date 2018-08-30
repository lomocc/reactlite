import React, { Component } from 'react';

import { Box, Button, Button2 } from 'reactlite';
import { css } from 'styled-components';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Box
          id="box-12345"
          ref={ref => {
            console.log('ref', ref);
          }}
          flexbox
          relative
          width={400}
          // column={7 / 12}
          color="red"
          backgroundColor={'#f90'}
          justifyContent="center"
        >
          Box flex relative
        </Box> */}
        <Box
          theme={{
            Box: {
              color: '#66f',
              backgroundColor: '#e0f',
              mdBackgroundColor: '#ff0'
            }
          }}
          aspectRatio={10}
          flexWrap="wrap"
          mdFlexWrap="wrap-reverse"
          margin={10}
          mdMargin={20}
          lgMargin={40}
          fontSize={12}
          smFontSize={16}
          mdFontSize={20}
          lgFontSize={30}
          flex="1 1 auto"
          mdFlex="1 1 auto"
          mdColor="green"
          lgColor="orange"
          shape="rounded"
        >
          Box flex relative111 1
        </Box>
        <Box display="flex" flex="1 1 auto">
          <Box
            column={5 / 12}
            shape="pill"
            backgroundColor="#f00"
            aspectRatio={1}
          >
            AAA
          </Box>
          <Button
            column={8 / 12}
            mdColumn={1 / 12}
            onClick={() => console.log('onClick')}
          >
            Button2
          </Button>
          <Button column={3 / 12} shape="pill">
            Button
          </Button>
        </Box>
      </div>
    );
  }
}
