import React from 'react';

export default class State extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.state || {};

    this.setStateBond = (_, cb) => {
      this.setState(_, cb);
    };
    const {
      componentDidMount,
      componentDidUpdate,
      componentWillUnmount
    } = this.props;
    if (componentDidMount) {
      this.componentDidMount = () =>
        componentDidMount({
          props: this.props,
          state: this.state,
          setState: this.setStateBond
        });
    }
    if (componentDidUpdate) {
      this.componentDidUpdate = (prevProps, prevState) =>
        componentDidUpdate({
          prevProps,
          prevState,
          props: this.props,
          state: this.state,
          setState: this.setStateBond
        });
    }

    if (componentWillUnmount) {
      this.componentWillUnmount = () =>
        componentWillUnmount({
          props: this.props,
          state: this.state,
          setState: this.setStateBond
        });
    }
  }
  render() {
    const { children } = this.props;
    return React.createElement(children, {
      props: this.props,
      state: this.state,
      setState: this.setStateBond
    });
  }
}
