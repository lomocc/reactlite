/**
 * Created by Vincent on 2018/8/21.
 */
import unitlessKeys from '@emotion/unitless';
import ResponsiveMap from './breakpoints';
import CSSProps from './CSSProps';

const mediaQueryRegexp = /^(lg|md|sm)[A-Z]/;

function dangerousStyleValue(name, value, isCustomProperty) {
  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }
  if (
    !isCustomProperty &&
    typeof value === 'number' &&
    value !== 0 &&
    !(unitlessKeys.hasOwnProperty(name) && unitlessKeys[name])
  ) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }
  return ('' + value).trim();
}
function getStyleContent(styleName, styleValue) {
  if (!CSSProps.hasOwnProperty(styleName)) {
    return '';
  }
  if (typeof styleValue !== 'number' && typeof styleValue !== 'string') {
    return '';
  }
  let isCustomProperty = styleName.indexOf('--') === 0;

  return `  ${CSSProps[styleName]}: ${dangerousStyleValue(
    styleName,
    styleValue,
    isCustomProperty
  )};\n`;
}
export const withResponsiveProp = propsMap => props => {
  let styles = {};
  for (let styleFullName in props) {
    if (!props.hasOwnProperty(styleFullName)) {
      continue;
    }
    let styleValue = props[styleFullName];
    if (typeof styleValue === 'object') {
      continue;
    }
    let type;
    let styleName;
    if (mediaQueryRegexp.test(styleFullName)) {
      type = styleFullName.slice(0, 2);
      styleName = styleFullName.slice(2).replace(/^(\w)/, v => v.toLowerCase());
    } else {
      styleName = styleFullName;
      type = '';
    }
    let styleContent;
    if (propsMap && propsMap.hasOwnProperty(styleName)) {
      let styleObj = propsMap[styleName](styleValue);
      if (styleObj) {
        styleContent = Object.keys(styleObj).reduce(
          (styleContent, styleName) =>
            styleContent + getStyleContent(styleName, styleObj[styleName]),
          ''
        );
      }
    } else {
      styleContent = getStyleContent(styleName, styleValue);
    }
    if (styleContent) {
      if (!styles[type]) {
        styles[type] = styleContent;
      } else {
        styles[type] += styleContent;
      }
    }
  }
  let cssString = '';
  for (let type in styles) {
    if (type === '') {
      cssString += `{\n${styles[type]}}\n`;
    } else {
      cssString += `@media ${ResponsiveMap[type]} {\n${styles[type]}}\n`;
    }
  }
  return cssString;
};
export const omitResponsiveProp = (responsiveProps, props) => {
  let resultProps = {};
  for (let styleName in props) {
    if (!responsiveProps[styleName] && !mediaQueryRegexp.test(styleName)) {
      resultProps[styleName] = props[styleName];
    }
  }
  return resultProps;
};

export function parseStyleProps(originProps, propsToStyle) {
  const { style: originStyle, ...clonedProps } = originProps;
  const style = {};
  Object.keys(propsToStyle).forEach(key => {
    Object.assign(style, propsToStyle[key](clonedProps[key]));
    delete clonedProps[key];
  });
  Object.assign(style, originStyle);
  return { ...clonedProps, style };
}
