import PropTypes from 'prop-types';
import { ifProp, prop } from 'styled-tools';
import styled, { css } from 'styled-components';
import as from './utils/as';
import Box from './Box';

const Divider = styled(Box)`
  border: 1px solid currentcolor;
  opacity: 0.2;

  ${ifProp(
    'vertical',
    css`
      margin-top: 0;
      margin-bottom: 0;
      min-height: 100%;
      width: 0;
      border-width: 0 0 0 1px;
    `,
    css`
      margin-left: 0;
      margin-right: 0;
      margin: 0.5rem 0;
      height: 0;
      border-width: 1px 0 0 0;
    `
  )};

  ${prop('theme.Divider')};
`;

Divider.propTypes = {
  vertical: PropTypes.bool
};

export default as('div')(Divider);
