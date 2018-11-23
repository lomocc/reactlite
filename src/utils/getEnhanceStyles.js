import enhanceStyles from './enhanceStyles';
import hyphenateStyleName from './hyphenateStyleName';

const formatStyle = (styleName, styleValue) => {
  return hyphenateStyleName(styleName) + ':' + styleValue + ';';
};
const formatStylePretty = (styleName, styleValue) => {
  return '  ' + hyphenateStyleName(styleName) + ': ' + styleValue + ';\n';
};

const getEnhanceStyles = (propName, propValue, pretty = false) => {
  const formatString = pretty ? formatStylePretty : formatStyle;
  if (!enhanceStyles.hasOwnProperty(propName)) {
    return formatString(propName, propValue);
  }
  let styleStr = '';
  let styleObj = enhanceStyles[propName](propValue);
  if (styleObj) {
    for (const styleName in styleObj) {
      if (styleObj.hasOwnProperty(styleName)) {
        const styleValue = styleObj[styleName];
        styleStr += formatString(styleName, styleValue);
      }
    }
  }

  return styleStr;
};
export default getEnhanceStyles;
