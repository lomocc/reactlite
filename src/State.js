import React from 'react';

export default class State extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.state || {};

    this.setStateBond = (_, cb) => {
      this.setState(_, cb);
    };

    const {
      constructor,
      componentDidMount,
      componentDidUpdate,
      componentWillUnmount
    } = this.props;

    if (componentDidMount) {
      this.componentDidMount = () =>
        componentDidMount({
          state: this.state,
          setState: this.setStateBond
        });
    }
    if (componentDidUpdate) {
      this.componentDidUpdate = (prevProps, prevState) =>
        componentDidUpdate({
          prevState,
          state: this.state,
          setState: this.setStateBond
        });
    }

    if (componentWillUnmount) {
      this.componentWillUnmount = () =>
        componentWillUnmount({
          state: this.state,
          setState: this.setStateBond
        });
    }
    constructor &&
      constructor({
        state: this.state,
        setState: this.setStateBond
      });
  }
  render() {
    const { children } = this.props;
    return children({ state: this.state, setState: this.setStateBond }) || null;
  }
}
