import CSSProps from './CSSProps';

function pickCSSProps(props) {
  let filteredProps;

  for (const prop in props) {
    if (prop in CSSProps) {
      if (!filteredProps) {
        filteredProps = {};
      }
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}

export default pickCSSProps;
