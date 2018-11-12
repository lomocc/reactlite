import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import parseStyleProps from './utils/parseStyleProps';

const propsToStyle = {
  error: value =>
    value && {
      borderColor: 'red'
    }
};

const InputBase = styled(Text)`
  border-color: #8e8e8e;
  padding: 4px 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: block;
  width: 100%;
  &:focus {
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
    outline: none;
  }
  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }
  textarea& {
    padding: 0.5em;
    height: auto;
  }
  &[type='checkbox'],
  &[type='radio'] {
    display: inline-block;
    width: auto;
    height: auto;
    padding: 0;
  }
`;
const Input = props => {
  const parsedProps = parseStyleProps(props, propsToStyle);
  return (
    <InputBase as="input" role="input" className="Input" {...parsedProps} />
  );
};

Input.defaultProps = {
  type: 'text',
  shape: 'rounded'
};

export default Input;
