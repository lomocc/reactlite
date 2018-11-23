import isPropValid from '@emotion/is-prop-valid';

function filterHTMLProps(props) {
  const filteredProps = {};

  for (const prop in props) {
    if (props.hasOwnProperty(prop)) {
      if (isPropValid(prop)) {
        filteredProps[prop] = props[prop];
      }
    }
  }

  return filteredProps;
}

export default filterHTMLProps;
