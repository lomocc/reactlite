/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Text, Button, Layer } from 'reactlite';

class Modal extends Component {
  removeSelf = () => {
    Layer.removeElement(this);
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
        <Text>Modal</Text>

        <Button onClick={this.removeSelf}>移除自身</Button>
      </Box>
    );
  }
}
export default class LayerExample extends Component {
  add = () => {
    let instance = Layer.addElement(Modal, { title: '定制 Modal title' });
    console.log('addElement instance', instance);
    this.instance = instance;
  };
  remove = () => {
    console.log('全局移除上一个');
    Layer.removeElement(this.instance);
    // console.log('addElement instance', instance);
  };
  render() {
    return (
      <Box>
        <Button onClick={this.add}>add</Button>
        <Button onClick={this.remove}>remove</Button>
      </Box>
    );
  }
}
