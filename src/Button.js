import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import Text from './Text';
import as from './utils/as';
import { withResponsiveProp } from './utils/styledProps';

const handleKeyPress = e => {
  if (e.charCode === 32 || e.charCode === 13) {
    e.preventDefault();
    e.target.click();
  }
};

const Button = styled(Text)`
  text-align: center;
  display: inline-flex;
  position: relative;
  appearance: none;
  user-select: none;
  outline: none;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  min-width: 2.5em;
  padding: 0.5em 1em;
  line-height: unset;
  &:hover,
  &:focus {
    box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.1);
  }
  &:active,
  &.active {
    box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.2);
  }
  &:after {
    display: none;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, 0.35);
  }
  &[disabled] {
    pointer-events: none;
    color: #8e8e8e;
    box-shadow: inset 0 0 999em #efefef;
    &:after {
      display: block;
    }
  }
  &:not(button):not(select):not(input) {
    display: inline-grid;
    grid-gap: 0.68em;
    grid-auto-flow: column;
    align-content: center;
  }
  & {
    ${({ inline }) => {
      let cssStyle = withResponsiveProp({
        inline: value => !value && { width: '100%' }
      })({ inline });
      return cssStyle;
    }};
  }
  ${prop('theme.Button')};
`;

Button.defaultProps = {
  role: 'button',
  tabIndex: 0,
  onKeyPress: handleKeyPress,
  size: 100,
  inline: false
};
Button.propTypes = {
  shape: PropTypes.oneOf([
    'square',
    'rounded',
    'pill',
    'circle',
    'roundedTop',
    'roundedBottom',
    'roundedLeft',
    'roundedRight'
  ])
};
export default as('button')(Button);
