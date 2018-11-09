import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { withProp } from 'styled-tools';
import as from './utils/as';
import CSSProps from './utils/CSSProps';
import ExtraCSSProps from './utils/ExtraCSSProps';
import { omitResponsiveProp, withResponsiveProp } from './utils/styledProps';

const styleProps = Object.assign({}, CSSProps, ExtraCSSProps);

const Base = ({ as, ...props }) => {
  return React.createElement(as, omitResponsiveProp(styleProps, props));
};

const Container = styled(Base)`
  margin: unset;
  padding: unset;
  border: unset;
  background: unset;
  font: unset;
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  ${withProp('theme.Container', withResponsiveProp())};
  ${withResponsiveProp(ExtraCSSProps)};
`;

const asTypes = [PropTypes.func, PropTypes.string];

Container.propTypes = {
  as: PropTypes.oneOfType([
    ...asTypes,
    PropTypes.arrayOf(PropTypes.oneOfType(asTypes))
  ])
};
/**
 * 具有 Media Query 功能的 Box
 */
export default as('div')(Container);
