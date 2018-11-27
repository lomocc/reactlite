import CSSProps from './CSSProps';
import CustomCSSProps from './CustomCSSProps';
import dangerousStyleValue from './dangerousStyleValue';
import hyphenateStyleName from './hyphenateStyleName';

const formatStyle = (styleName, styleValue) => {
  return hyphenateStyleName(styleName) + ':' + styleValue + ';';
};
const formatStylePretty = (styleName, styleValue) => {
  return '  ' + hyphenateStyleName(styleName) + ': ' + styleValue + ';\n';
};

const getStyleValues = (propName, propValue, pretty = false) => {
  const formatString = pretty ? formatStylePretty : formatStyle;
  if (CustomCSSProps.hasOwnProperty(propName)) {
    let styleObj = CustomCSSProps[propName](propValue);
    if (styleObj) {
      let styleStr = '';
      for (const styleName in styleObj) {
        if (styleObj.hasOwnProperty(styleName)) {
          const styleValue = styleObj[styleName];
          styleStr += formatString(
            styleName,
            dangerousStyleValue(styleName, styleValue)
          );
        }
      }
      return styleStr;
    }
  } else if (CSSProps.hasOwnProperty(propName)) {
    return formatString(propName, dangerousStyleValue(propName, propValue));
  } else return '';
};
export default getStyleValues;
