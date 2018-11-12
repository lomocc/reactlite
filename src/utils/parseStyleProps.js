export default function parseStyleProps(originProps, propsToStyle) {
  const { style: originStyle, ...clonedProps } = originProps;
  const style = {};
  Object.keys(propsToStyle).forEach(key => {
    Object.assign(style, propsToStyle[key](clonedProps[key]));
    delete clonedProps[key];
  });
  Object.assign(style, originStyle);
  return { ...clonedProps, style };
}
