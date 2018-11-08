import React from 'react';
import { Box, Button } from 'reactlite';

export default class Benchmark extends React.Component {
  state = {
    children: []
  };
  startBox = () => {
    let children = new Array(1000).fill(1).map(() => (
      <Box
        backgroundColor="blue"
        smBackgroundColor="red"
        width={100 * Math.random()}
        height={20}
        smWidth="100%"
        smHeight={10}
      >
        {Math.random()}
      </Box>
    ));
    this.setState({ children });
  };
  startDiv = () => {
    let children = new Array(1000).fill(1).map(() => (
      <div
        style={{
          backgroundColor: 'blue',
          width: 20,
          height: 20,
          color: 'red'
        }}
      >
        {Math.random()}
      </div>
    ));
    this.setState({ children });
  };
  clear = () => {
    this.setState({ children: [] });
  };
  render() {
    let { children } = this.state;
    return (
      <Box>
        <Button onClick={this.startBox}>startBox</Button>
        <Button onClick={this.startDiv}>startDiv</Button>
        <Button onClick={this.clear}>clear</Button>
        <Box>{children}</Box>
      </Box>
    );
  }
}
