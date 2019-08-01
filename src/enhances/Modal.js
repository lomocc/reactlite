import React from 'react';
import ReactDOM from 'react-dom';

const modalRef = React.createRef();
let uniqueKey = 0;

export default class Modal extends React.Component {
  state = {
    children: []
  };

  static Provider(props) {
    return React.createElement(Modal, { ...props, ref: modalRef });
  }

  static show(element) {
    return modalRef.current.show(element);
  }

  show = async element => {
    let clonedElement;
    const promise = new Promise((resolve, reject) => {
      clonedElement = React.cloneElement(element, {
        key: uniqueKey++,
        resolve,
        reject
      });
    });
    this.setState(({ children }) => {
      return {
        children: [...children, clonedElement]
      };
    });
    const result = await promise;
    this.setState(({ children }) => {
      return {
        children: children.filter(val => val !== clonedElement)
      };
    });
    return result;
  };

  el = document.createElement('div');

  componentDidMount() {
    this.el.setAttribute('reactlite-modal', '');
    (this.props.container || document.body).appendChild(this.el);
  }

  componentWillUnmount() {
    (this.props.container || document.body).removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.state.children, this.el);
  }
}
