import { prop } from 'styled-tools';
import styled from 'styled-components';
import { withResponsiveProp } from './utils/styledProps';
import as from './utils/as';
import Text from './Text';

const Input = styled(Text)`
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
  & {
    ${({ size, error }) => {
      let cssStyle = withResponsiveProp({
        error: value =>
          value && {
            borderColor: 'red'
          },
        size: value =>
          prop(value)({
            '900': {
              fontSize: '20px',
              lineHeight: '26px',
              padding: 8
            },
            '800': {
              fontSize: '18px',
              lineHeight: '24px',
              padding: 7
            },
            '700': {
              fontSize: '18px',
              lineHeight: '22px',
              padding: 6
            },
            '600': {
              fontSize: '16px',
              lineHeight: '22px',
              padding: 4
            },
            '500': {
              fontSize: '16px',
              lineHeight: '20px',
              padding: 4
            },
            '400': {
              fontSize: '14px',
              lineHeight: '20px',
              padding: 3
            },
            '300': {
              fontSize: '14px',
              lineHeight: '18px',
              padding: 3
            },
            '200': {
              fontSize: '12px',
              lineHeight: '18px',
              padding: 2
            },
            '100': {
              fontSize: '12px',
              lineHeight: '16px',
              padding: 2
            }
          })
      })({ size, error });
      return cssStyle;
    }};
  }
  ${prop('theme.Input')};
`;

Input.defaultProps = {
  type: 'text',
  size: '100'
};

export default as('input')(Input);
