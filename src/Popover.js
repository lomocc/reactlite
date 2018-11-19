import Popper from 'popper.js';
import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Box from './Box';
import State from './State';

export default class extends PureComponent {
  static defaultProps = {
    placement: 'auto',
    stateToProps: ({ setState }, targetProps) => ({
      onClick(event) {
        console.log('onClick');
        targetProps.onClick && targetProps.onClick(event);
        setState(state => ({
          visible: !state.visible
        }));
      }
    })
  };
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.el.className = 'popover';
    this.triggerRef = React.createRef();
  }

  updatePopper = visible => {
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
  componentDidMount() {}

  componentWillUnmount() {
    this.destroyPopper();
  }

  render() {
    const { children, content, stateToProps } = this.props;

    return (
      <State
        state={{ visible: false }}
        componentDidUpdate={({
          prevProps,
          prevState,
          props,
          state,
          setState
        }) => {
          if (prevState.visible !== state.visible) {
            this.updatePopper(state.visible);
          }
        }}
      >
        {props => (
          <Fragment>
            {React.cloneElement(children, {
              ref: this.triggerRef,
              ...stateToProps(props, children.props)
            })}
            {props.state.visible &&
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
