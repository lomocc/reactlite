import Popper from 'popper.js';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '../primitives';

function Arrow({ placement, size, ...props }) {
  const placementToArrow = {
    top: `M0 0 L${size / 2} ${size / 2} L${size} 0`,
    right: `M${size} 0 L${size / 2} ${size / 2} L${size} ${size}`,
    bottom: `M0 ${size} L${size / 2} ${size / 2} L${size} ${size}`,
    left: `M0 0 L${size / 2} ${size / 2} L0 ${size}`
  };
  const arrowPath = placementToArrow[placement];

  const centerStyle = `calc(50% - ${size / 2}px)`;
  const caretStyles = {
    top: {
      position: 'absolute',
      bottom: -size + 1,
      left: centerStyle
    },
    right: {
      position: 'absolute',
      left: -size + 1,
      top: centerStyle
    },
    bottom: {
      position: 'absolute',
      top: -size + 1,
      left: centerStyle
    },
    left: {
      position: 'absolute',
      right: -size + 1,
      top: centerStyle
    }
  };
  const styles = caretStyles[placement];

  return (
    <Box is="svg" width={size} height={size} {...styles} {...props}>
      <path d={arrowPath} />
    </Box>
  );
}

export default class extends PureComponent {
  static defaultProps = {
    placement: 'auto',
    shape: 'rounded',
    arrowSize: 12,
    borderColor: '#ddd',
    backgroundColor: '#eee'
  };
  popper = null;

  onClick = event => {
    if (!event.target instanceof Node) {
      return;
    }
    if (this.el.contains(event.target)) {
      return;
    }
    let targetDOMNode = this.getTargetDOMNode();
    if (targetDOMNode && !targetDOMNode.contains(event.target)) {
      let { onDismiss } = this.props;
      onDismiss && onDismiss();
    }
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
    this.updatePopper();
  };

  state = {
    placement: null
  };
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }
  getTargetDOMNode = () => {
    let { target } = this.props;
    if (typeof target === 'string') {
      return document.querySelector(target);
    }
    if (target instanceof Node) {
      return target;
    }
  };

  updatePopper = () => {
    const { placement, target } = this.props;
    document.body.appendChild(this.el);
    let targetDOMNode = this.getTargetDOMNode() || document.body;
    this.popper = new Popper(targetDOMNode, this.el, {
      placement,
      offset: 40,
      modifiers: {
        applyStyle: { enabled: true },
        arrow: { enabled: true, element: '[data-x-arrow]' },
        offset: { offset: `0, 10` },
        flip: { enabled: true, padding: 16 }
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
    const {
      children,
      shape,
      arrowSize,
      borderColor,
      backgroundColor
    } = this.props;
    const { placement } = this.state;

    return (
      placement &&
      ReactDOM.createPortal(
        <Box
          shape={shape}
          borderWidth={1}
          borderStyle="solid"
          borderColor={borderColor}
          backgroundColor={backgroundColor}
        >
          {children}
          <Arrow
            size={arrowSize}
            placement={placement}
            stroke={borderColor}
            fill={backgroundColor}
          />
        </Box>,
        this.el
      )
    );
  }
}
