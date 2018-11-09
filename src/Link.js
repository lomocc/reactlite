import color from 'color';
import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import { parseStyleProps } from './utils/styledProps';

const LinkBase = styled(Text)`
  white-space: nowrap;
  text-decoration: none;
`;
class Link extends React.Component {
  state = {
    hovered: false
  };

  handleMouseEnter = () => {
    this.setState({ hovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ hovered: false });
  };

  render() {
    const { hovered } = this.state;
    const propsToStyle = {
      color: value => {
        if (hovered) {
          let originColor = color(value);
          let hoveredColor = originColor.isDark()
            ? originColor
                .lighten(0.5)
                .hex()
                .toString()
            : originColor
                .darken(0.5)
                .hex()
                .toString();
          return { color: hoveredColor };
        } else {
          return { color: value };
        }
      }
    };
    const parsedProps = parseStyleProps(this.props, propsToStyle);
    return (
      <LinkBase
        as="a"
        role="link"
        className="Link"
        {...parsedProps}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

Link.defaultProps = {
  color: 'black'
};
export default Link;
