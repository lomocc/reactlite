/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Button, Layer } from 'reactlite';

class Modal extends Component {
  removeSelf = () => {
    console.log('removeSelf');
    this.props.unmount();
    // Layer.removeElement(this);
  };
  render() {
    let { title } = this.props;
    return (
      <Box
        width={400}
        heighr={400}
        backgroundColor={
          '#' +
          Math.random()
            .toString(16)
            .substr(2, 6)
        }
      >
        <Button>{title}</Button>

        <Button onClick={this.removeSelf}>移除自身</Button>
      </Box>
    );
  }
}
export default class LayerExample extends Component {
  add = () => {
    this.element = <Modal title="定制 Modal title" />;
    Layer.mount(this.element);
  };
  remove = () => {
    Layer.unmount(this.element);
  };
  render() {
    return (
      <Box>
        <Layer>
          <div>Layer Content</div>
        </Layer>
        <Button onClick={this.add}>add</Button>
        <Button onClick={this.remove}>remove</Button>
      </Box>
    );
  }
}
