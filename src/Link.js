import { withProp, prop } from 'styled-tools';
import color from 'color';
import styled, { css } from 'styled-components';
import as from './utils/as';
import Text from './Text';

const Link = styled(Text)`
  white-space: nowrap;
  text-decoration: none;
  color: inherit;
  &&& {
    ${withProp('color', value => {
      return (
        value &&
        css`
          :link,
          :visited,
          :focus {
            color: ${value};
          }
          :hover {
            color: ${color(value)
              .darken(0.3)
              .string()};
          }
        `
      );
    })};
  }
  ${prop('theme.Link')};
`;

export default as('a')(Link);
