import Popper from 'popper.js';
import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';

let caretStyles = {
  top: {
    bottom: 0,
    left: 'calc(50% - 5px)'
  },
  right: {
    left: 0,
    top: 'calc(50% - 5px)'
  },
  bottom: {
    position: 'absolute',
    top: '5px',
    left: 'calc(50% - 5px)'
  },
  left: {
    right: 0,
    top: 'calc(50% - 5px)'
  }
};
function Caret({ direction, ...props }) {
  let path;
  switch (direction) {
    case 'top':
      path = 'M0 0 L12 12 L24 0';
      break;
    case 'right':
      path = 'M24 0 L12 12 L24 24';
      break;
    case 'bottom':
      path = 'M0 24 L12 12 L24 24';
      break;
    case 'left':
      path = 'M0 0 L12 12 L0 24';
      break;
    default:
  }
  let style = caretStyles[direction];

  console.log('caretStyles', style);

  return (
    <svg width="24" height="24" style={style} {...props}>
      <path d={path} />
    </svg>
  );
}

export default class extends PureComponent {
  static defaultProps = {
    placement: 'auto'
  };
  popper = null;

  onClick = event => {
    const el = ReactDOM.findDOMNode(this);
    if (!el || (event.target instanceof Node && el.contains(event.target))) {
      return;
    }
    this.onClickOutside(event);
  };
  onClickOutside = event => {
    let targetDOMNode = this.getTargetDOMNode();
    if (
      event.target instanceof Node &&
      targetDOMNode &&
      !targetDOMNode.contains(event.target)
    ) {
      let { onDismiss } = this.props;
      onDismiss && onDismiss();
    }
  };

  onResize = () => {
    console.log('onResize');

    this.updatePopper();
  };

  state = {
    placement: null
  };
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.el.className = 'popover';
  }
  getTargetDOMNode = () => {
    let { target } = this.props;
    let targetDOMNode;
    if (typeof target === 'string') {
      targetDOMNode = document.querySelector(target);
    } else {
      targetDOMNode = target;
    }
    return targetDOMNode;
  };

  updatePopper = () => {
    const { placement, target } = this.props;
    document.body.appendChild(this.el);
    let targetDOMNode = this.getTargetDOMNode() || document.body;
    this.popper = new Popper(targetDOMNode, this.el, {
      placement,
      modifiers: {
        applyStyle: { enabled: true },
        arrow: { enabled: true, element: '[data-x-arrow]' }
      },
      onCreate: ({ placement, ...args }) => {
        this.setState({ placement });
        console.log('onCreate', placement, args);
      },
      onUpdate: ({ placement }) => {
        this.setState({ placement });
        console.log('onUpdate', placement);
      }
    });
  };

  destroyPopper = () => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
      document.body.removeChild(this.el);
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.onClick, true);
    window.addEventListener('resize', this.onResize);

    this.updatePopper();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updatePopper();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick, true);
    window.removeEventListener('resize', this.onResize);

    this.destroyPopper();
  }

  render() {
    const { children, arrow } = this.props;
    const { placement } = this.props;

    return ReactDOM.createPortal(
      <Fragment>
        {placement}-{children}
        <Caret direction={placement} data-x-arrow="" />
      </Fragment>,
      this.el
    );
  }
}
