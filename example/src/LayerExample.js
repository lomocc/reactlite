/**
 * Created by Vincent on 2018/8/6.
 */

import React, { Component } from 'react';
import { Box, Button, Modal } from 'reactlite';

class ModalComponent extends Component {
  removeSelf = () => {
    console.log('removeSelf');
    this.props.resolve();
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
export default class ModalExample extends Component {
  show = () => {
    Modal.show(<ModalComponent title="定制 Modal title" />);
  };

  render() {
    return (
      <Box>
        <Modal.Provider />
        <Button onClick={this.show}>show</Button>
      </Box>
    );
  }
}
