import Popper from 'popper.js';
import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';

function isStyledElement(target) {
  return (
    target && target.type && typeof target.type.styledComponentId === 'string'
  );
}

export default class extends PureComponent {
  static defaultProps = {
    placement: 'auto',
    options: {}
  };
  state = {
    data: null
  };
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.triggerRef = React.createRef();
  }
  applyReactStyle = () => {};
  initPopper = () => {
    if (!this.popper) {
      const { placement } = this.props;
      const target = ReactDOM.findDOMNode(this.triggerRef.current);
      if (target) {
        this.popper = new Popper(target, this.el, {
          placement,
          modifiers: {
            applyStyle: { enabled: true },
            arrow: { enabled: true, element: '[data-x-arrow]' },
            offset: { offset: `0, 12` },
            applyReactStyle: {
              enabled: true,
              fn: this.applyReactStyle,
              order: 900
            }
          },
          onCreate: () => {
            // console.log('onCreate');
          },
          onUpdate: () => {
            // console.log('onUpdate');
          }
        });
      }
    }
  };

  destroyPopper = () => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = undefined;
    }
  };
  componentDidMount() {
    document.body.appendChild(this.el);

    this.initPopper();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.placement !== this.props.placement ||
      prevProps.children !== this.props.children
    ) {
      this.destroyPopper();
      this.initPopper();
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    this.destroyPopper();
  }
  render() {
    const { children, content } = this.props;
    let popperPortal = ReactDOM.createPortal(<div>{content}</div>, this.el);

    let isStyledBox = isStyledElement(children);

    let target = React.cloneElement(children, {
      [isStyledBox ? 'elementRef' : 'ref']: this.triggerRef
    });
    return (
      <Fragment>
        {target}
        {popperPortal}
      </Fragment>
    );
  }
}
