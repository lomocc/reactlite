import isPropValid from '@emotion/is-prop-valid';
import CSSProps from './CSSProps';
import CustomCSSProps from './CustomCSSProps';

export default function filterHTMLProps(props, callback) {
  let filteredProps = {};

  for (const prop in props) {
    if (!(prop in CSSProps) && !(prop in CustomCSSProps) && isPropValid(prop)) {
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}
