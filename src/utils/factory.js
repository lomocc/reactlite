import React from 'react';
import filterHTMLProps from './filterHTMLProps';
import getStyleCache from './getStyleCache';

/** Shared instance of a style cache object. */
const cache = getStyleCache();

const getDerivedStateFromProps = props => ({
  className: cache.getClassName(props, props.className)
});

export default function factory(displayName, defaultProps) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      // className will be set before initial render with either getDerivedStateFromProps or componentWillMount
      this.state = { className: null };

      const componentWillMount = () => {
        this.setState(getDerivedStateFromProps(this.props));
      };

      const componentWillReceiveProps = nextProps => {
        this.setState(getDerivedStateFromProps(nextProps));
      };

      // In React 16.3+, deprecated lifecycles will not be called if getDerivedStateFromProps is defined.
      // This boolean prevents React from logging the presence of these functions as an error in strict mode.
      // See https://github.com/reactjs/react-lifecycles-compat/blob/0a02b80/index.js#L47
      componentWillReceiveProps.__suppressDeprecationWarning = true;
      componentWillMount.__suppressDeprecationWarning = true;

      this.componentDidMount = componentWillMount;
      this.componentWillReceiveProps = componentWillReceiveProps;
    }

    static defaultProps = defaultProps;
    static displayName = displayName;
    static getDerivedStateFromProps = getDerivedStateFromProps;

    render() {
      const { style, children, is, ...props } = this.props;
      const Component = is || 'div';

      return (
        <Component
          {...filterHTMLProps(props)}
          className={this.state.className || undefined}
          style={style || undefined}
        >
          {children}
        </Component>
      );
    }
  };
}
