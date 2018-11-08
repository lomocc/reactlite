/**
 * Created by Vincent on 2018/8/21.
 */
import { css } from 'styled-components';
import ResponsiveMap from './breakpoints';
import CSSProps from './CSSProps';

const mediaQueryRegexp = /^(lg|md|sm)[A-Z]/;
const isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
function dangerousStyleValue(name, value, isCustomProperty) {
  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }
  if (
    !isCustomProperty &&
    typeof value === 'number' &&
    value !== 0 &&
    !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
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
  let stylesImportant = {};
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
    let isInlineStyle = false;
    let styleContent;
    if (propsMap && propsMap.hasOwnProperty(styleName)) {
      let styleObj = propsMap[styleName](styleValue);
      if (styleObj) {
        styleContent = Object.keys(styleObj).reduce(
          (styleContent, styleName) => {
            return (
              styleContent + getStyleContent(styleName, styleObj[styleName])
            );
          },
          ''
        );
      }
    } else {
      isInlineStyle = true;
      styleContent = getStyleContent(styleName, styleValue);
    }
    let container = isInlineStyle ? stylesImportant : styles;
    if (container[type] == null) {
      container[type] = '';
    }
    if (styleContent) {
      container[type] += styleContent;
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
  let cssStringImportant = '';
  for (let type in stylesImportant) {
    if (type === '') {
      cssStringImportant += `{\n${stylesImportant[type]}}\n`;
    } else {
      cssStringImportant += `@media ${ResponsiveMap[type]} {\n${
        stylesImportant[type]
      }}\n`;
    }
  }
  let cssStyle = css`
    &&& {
      ${cssString};
    }
    &&&& {
      ${cssStringImportant};
    }
  `;
  return cssStyle;
};

export const omitResponsiveProp = (responsiveProps, props) => {
  let resultProps = {};
  for (let styleName in props) {
    if (
      !CSSProps[styleName] &&
      !responsiveProps[styleName] &&
      !mediaQueryRegexp.test(styleName)
    ) {
      resultProps[styleName] = props[styleName];
    }
  }
  return resultProps;
};
