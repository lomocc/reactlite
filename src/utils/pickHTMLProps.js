import isPropValid from '@emotion/is-prop-valid';

function pickHTMLProps(props) {
  const filteredProps = {};

  for (const prop in props) {
    if (isPropValid(prop)) {
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}

export default pickHTMLProps;
