import React, { Component } from 'react';
import Layer from './Layer';
import State from './State';
import Tag from './Tag';

export default class extends Component {
  render() {
    const { children, tooltip, tooltipProps, ...props } = this.props;
    return (
      <State state={{ visible: false }}>
        {({ visible, target }, setState) => (
          <Tag
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
          </Tag>
        )}
      </State>
    );
  }
}
