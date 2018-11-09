import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import Box from './Box';
import as from './utils/as';
import { omitResponsiveProp, withResponsiveProp } from './utils/styledProps';

const responsiveProps = {
  italic: value => value && { fontStyle: 'italic' },
  bold: value => value && { fontWeight: 'bold' },
  inline: value => value && { display: 'inline-block' },
  nowrap: value =>
    value && {
      maxWidth: '100%',
      whiteSpace: 'nowrap'
    },
  ellipsis: value =>
    value && {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
  size: value =>
    prop(value)({
      '900': {
        fontSize: '28px',
        lineHeight: '32px'
      },
      '800': {
        fontSize: '26px',
        lineHeight: '30px'
      },
      '700': {
        fontSize: '24px',
        lineHeight: '28px'
      },
      '600': {
        fontSize: '22px',
        lineHeight: '26px'
      },
      '500': {
        fontSize: '20px',
        lineHeight: '24px'
      },
      '400': {
        fontSize: '18px',
        lineHeight: '22px'
      },
      '300': {
        fontSize: '16px',
        lineHeight: '20px'
      },
      '200': {
        fontSize: '14px',
        lineHeight: '18px'
      },
      '100': {
        fontSize: '12px',
        lineHeight: '16px'
      }
    })
};
const Base = props =>
  React.createElement(Box, omitResponsiveProp(responsiveProps, props));

const Text = styled(Base)`
  ${withResponsiveProp(responsiveProps)};
`;
Text.propTypes = {
  size: PropTypes.oneOf([
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ]),
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  // 不换行
  nowrap: PropTypes.bool,
  // 省略号
  ellipsis: PropTypes.bool
};
export default as('div')(Text);
