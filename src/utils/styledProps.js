/**
 * Created by Vincent on 2018/8/21.
 */
import { css } from 'styled-components';
import { ifNotProp, withProp, switchProp } from 'styled-tools';
import CSSProps from './CSSProps';
import {
  pickHTMLProps,
  pickCSSProps,
  parseClassName,
  getComponentName
} from './tools';

export const switchBoolProp = valueMap => props => {
  for (let k in valueMap) {
    if (props[k]) {
      return valueMap[k];
    }
  }
  return '';
};

let ResponsiveMap = {
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1312px)'
};

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
    return;
  }
  if (typeof styleValue !== 'number' && typeof styleValue !== 'string') {
    return;
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
    let type = styleFullName.slice(0, 2);
    let styleName;
    if (ResponsiveMap[type]) {
      styleName = styleFullName.slice(2).replace(/^(\w)/, v => v.toLowerCase());
    } else {
      styleName = styleFullName;
      type = '';
    }
    let styleContent;
    if (propsMap && propsMap.hasOwnProperty(styleName)) {
      let styleObj = propsMap[styleName](styleValue);
      styleContent = Object.keys(styleObj).reduce((styleContent, styleName) => {
        return styleContent + getStyleContent(styleName, styleObj[styleName]);
      }, '');
    } else {
      styleContent = getStyleContent(styleName, styleValue);
    }

    if (styles[type] == null) {
      styles[type] = '';
    }
    if (styleContent) {
      styles[type] += styleContent;
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
  let cssStyle = css`
    ${cssString};
  `;
  return cssStyle;
};

export const responsiveProp = props => {
  let styles = {};
  for (let styleFullName in props) {
    if (!props.hasOwnProperty(styleFullName)) {
      continue;
    }
    let styleValue = props[styleFullName];
    if (typeof styleValue === 'object') {
      continue;
    }
    let type = styleFullName.slice(0, 2);
    let styleName;
    if (ResponsiveMap[type]) {
      styleName = styleFullName.slice(2).replace(/^(\w)/, v => v.toLowerCase());
    } else {
      styleName = styleFullName;
      type = '';
    }
    if (!CSSProps.hasOwnProperty(styleName)) {
      continue;
    }
    let isCustomProperty = styleName.indexOf('--') === 0;
    if (styles[type] == null) {
      styles[type] = '';
    }
    styles[type] += `  ${CSSProps[styleName]}: ${dangerousStyleValue(
      styleName,
      styleValue,
      isCustomProperty
    )};\n`;
  }
  let cssString = '';
  for (let type in styles) {
    if (type === '') {
      cssString += `{\n${styles[type]}}\n`;
    } else {
      cssString += `@media ${ResponsiveMap[type]} {\n${styles[type]}}\n`;
    }
  }
  let cssStyle = css`
    ${cssString};
  `;
  return cssStyle;
};

export const withResponsiveProp2 = name => withProp(name, responsiveProp);
