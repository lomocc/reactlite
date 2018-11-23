const styleElement = document.createElement('style');
styleElement.setAttribute('data-reactlite', '');
styleElement.type = 'text/css';
document.head.appendChild(styleElement);

export default function addStyleToHead(rule) {
  if (styleElement) {
    const sheet = styleElement.sheet;
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
}
