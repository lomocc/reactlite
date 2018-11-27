const style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.head.appendChild(style);
const sheet = style.sheet;

export default function addStyleToHead(rule) {
  try {
    sheet.insertRule(rule, sheet.cssRules.length);
  } catch (error) {
    // insertRule will fail for rules with pseudoelements the browser doesn't support.
    // see: https://github.com/jsxstyle/jsxstyle/issues/75
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        'Could not insert rule at position ' +
          sheet.cssRules.length +
          ': `' +
          rule +
          '`'
      );
    }
  }
}
