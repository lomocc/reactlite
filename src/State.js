import React from 'react';

export default class State extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.state || {};

    this.setStateBond = (_, cb) => {
      this.setState(_, cb);
    };
  }
  render() {
    const { children } = this.props;
    if (typeof children !== 'function') return null;
    return children(this.state, this.setStateBond);
  }
}
