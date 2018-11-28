import Popper from 'popper.js';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '../primitives';

function Arrow({ placement, arrowSize, ...props }) {
  const placementToArrow = {
    top: `M0 0 L${arrowSize / 2} ${arrowSize / 2} L${arrowSize} 0`,
    right: `M${arrowSize} 0 L${arrowSize / 2} ${arrowSize /
      2} L${arrowSize} ${arrowSize}`,
    bottom: `M0 ${arrowSize} L${arrowSize / 2} ${arrowSize /
      2} L${arrowSize} ${arrowSize}`,
    left: `M0 0 L${arrowSize / 2} ${arrowSize / 2} L0 ${arrowSize}`
  };
  const arrowPath = placementToArrow[placement];

  const centerStyle = `calc(50% - ${arrowSize / 2}px)`;
  const caretStyles = {
    top: {
      position: 'absolute',
      bottom: -arrowSize + 1,
      left: centerStyle
    },
    right: {
      position: 'absolute',
      left: -arrowSize + 1,
      top: centerStyle
    },
    bottom: {
      position: 'absolute',
      top: -arrowSize + 1,
      left: centerStyle
    },
    left: {
      position: 'absolute',
      right: -arrowSize + 1,
      top: centerStyle
    }
  };
  const styles = caretStyles[placement];

  return (
    <Box is="svg" width={arrowSize} height={arrowSize} {...styles} {...props}>
      <path d={arrowPath} />
    </Box>
  );
}

export default class extends PureComponent {
  static defaultProps = {
    arrowSize: 12,
    placement: 'auto',
    shape: 'rounded',
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
      let { onClickOutside } = this.props;
      onClickOutside && onClickOutside();
    }
  };
  onClickOutside = event => {
    let targetDOMNode = this.getTargetDOMNode();
    if (
      event.target instanceof Node &&
      targetDOMNode &&
      !targetDOMNode.contains(event.target)
    ) {
      let { onClickOutside } = this.props;
      onClickOutside && onClickOutside();
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
    const { placement, arrow } = this.props;
    document.body.appendChild(this.el);
    let targetDOMNode = this.getTargetDOMNode() || document.body;
    this.popper = new Popper(targetDOMNode, this.el, {
      placement,
      offset: 40,
      modifiers: {
        applyStyle: { enabled: true },
        arrow: { enabled: true, element: '[data-x-arrow]' },
        offset: { enabled: arrow, offset: `0, 10` },
        flip: { enabled: true, padding: 16 }
      },
      onCreate: ({ placement, ...args }) => {
        this.setState({ placement });
      },
      onUpdate: ({ placement }) => {
        this.setState({ placement });
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
      onClickOutside,
      placement,
      target,
      arrow,
      arrowSize,

      children,
      borderColor,
      backgroundColor,
      ...props
    } = this.props;
    const { placement: statePlacement } = this.state;

    return (
      statePlacement &&
      ReactDOM.createPortal(
        <Box
          borderWidth={1}
          borderStyle="solid"
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          {...props}
        >
          {children}
          {arrow && (
            <Arrow
              arrowSize={arrowSize}
              placement={statePlacement}
              stroke={borderColor}
              fill={backgroundColor}
            />
          )}
        </Box>,
        this.el
      )
    );
  }
}
