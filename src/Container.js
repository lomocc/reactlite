import styled from 'styled-components';
import ExtraCSSProps from './utils/ExtraCSSProps';
import { withResponsiveProp } from './utils/styledProps';

const Container = styled.div`
  margin: unset;
  padding: unset;
  border: unset;
  background: unset;
  font: unset;
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  ${withResponsiveProp(ExtraCSSProps)};
`;
/**
 * 具有 Media Query 功能的 Box
 */
export default Container;
