import React, { Component } from 'react';
import Box from './Box';
import Layer from './Layer';
import State from './State';

export default class extends Component {
  render() {
    const { children, tooltip, tooltipProps, ...props } = this.props;
    return (
      <State state={{ visible: false }}>
        {({ visible, target }, setState) => (
          <Box
            cursor="pointer"
            {...props}
            onMouseOver={event => {
              setState({ visible: true, target: event.target });
            }}
            onMouseOut={() => setState({ visible: false })}
          >
            {children}
            {visible && (
              <Layer>
                {React.createElement(tooltip, { target, ...tooltipProps })}
              </Layer>
            )}
          </Box>
        )}
      </State>
    );
  }
}
