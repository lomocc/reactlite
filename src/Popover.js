import Popper from 'popper.js';
import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Box } from './primitives';
import State from './State';

export default class extends PureComponent {
  static defaultProps = {
    placement: 'auto',
    stateToProps: ({ state, setState }, targetProps) => ({
      onClick(event) {
        console.log('onClick');
        targetProps.onClick && targetProps.onClick(event);
        setState(state => ({
          visible: !state.visible
        }));
      }
    })
  };
  state = {
    visible: false
  };
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.el.className = 'popover';
    this.triggerRef = React.createRef();
  }

  updatePopper = () => {
    let { visible } = this.state;
    const { placement } = this.props;
    if (visible) {
      document.body.appendChild(this.el);
      let reference = ReactDOM.findDOMNode(this.triggerRef.current);
      this.popper = new Popper(reference, this.el, {
        placement,
        modifiers: {
          applyStyle: { enabled: true },
          arrow: { enabled: true, element: '[data-x-arrow]' }
        }
      });
    } else {
      this.destroyPopper();
    }
  };

  destroyPopper = () => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = undefined;
      document.body.removeChild(this.el);
    }
  };
  componentDidMount() {
    this.updatePopper();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.visible !== this.state.visible) {
      this.updatePopper();
    }
  }
  componentWillUnmount() {
    this.destroyPopper();
  }

  render() {
    const { children, content, stateToProps } = this.props;

    return (
      <State
        state={{ visible: false }}
        componentDidUpdate={({ prevState, state, setState }) => {
          if (prevState.visible !== state.visible) {
            this.updatePopper(state.visible);
          }
        }}
      >
        {({ state, setState }) => (
          <Fragment>
            {React.cloneElement(children, {
              ref: this.triggerRef,
              ...stateToProps({ state, setState }, children.props)
            })}
            {state.visible &&
              ReactDOM.createPortal(
                <Fragment>
                  {content}
                  <Box data-x-arrow className="popover-arrow" />
                </Fragment>,
                this.el
              )}
          </Fragment>
        )}
      </State>
    );
  }
}
