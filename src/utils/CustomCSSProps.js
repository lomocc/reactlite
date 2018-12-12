const roundedBorderRadius = '0.25em';
const shapes = {
  square: { borderRadius: 0 },
  circle: { borderRadius: '50%' },
  pill: { borderRadius: '999px' },
  rounded: { borderRadius: `${roundedBorderRadius}` },
  roundedTop: {
    borderRadius: `${roundedBorderRadius} ${roundedBorderRadius} 0 0`
  },
  roundedRight: {
    borderRadius: `0 ${roundedBorderRadius} ${roundedBorderRadius} 0`
  },
  roundedBottom: {
    borderRadius: `0 0 ${roundedBorderRadius} ${roundedBorderRadius}`
  },
  roundedLeft: {
    borderRadius: `${roundedBorderRadius} 0 0 ${roundedBorderRadius}`
  }
};
const sizes = {
  xxl: {
    fontSize: '3rem'
  },
  xl: {
    fontSize: '2.25rem'
  },
  lg: {
    fontSize: '1.5rem'
  },
  md: {
    fontSize: '1.25rem'
  },
  sm: {
    fontSize: '1rem'
  },
  xs: {
    fontSize: '0.875rem'
  },
  xxs: {
    fontSize: '0.75rem'
  }
};
const factor4 = value => (typeof value === 'number' ? value * 4 : value);
const CustomCSSProps = {
  top: value => ({ top: value === true ? 0 : value }),
  right: value => ({ right: value === true ? 0 : value }),
  bottom: value => ({ bottom: value === true ? 0 : value }),
  left: value => ({ left: value === true ? 0 : value }),
  // margin
  margin: value => ({
    margin: factor4(value)
  }),
  marginTop: value => ({
    marginTop: factor4(value)
  }),
  marginRight: value => ({
    marginRight: factor4(value)
  }),
  marginBottom: value => ({
    marginBottom: factor4(value)
  }),
  marginLeft: value => ({
    marginLeft: factor4(value)
  }),
  marginX: value => ({
    marginLeft: factor4(value),
    marginRight: factor4(value)
  }),
  marginY: value => ({
    marginTop: factor4(value),
    marginBottom: factor4(value)
  }),
  // padding
  padding: value => ({
    padding: factor4(value)
  }),
  paddingTop: value => ({
    paddingTop: factor4(value)
  }),
  paddingRight: value => ({
    paddingRight: factor4(value)
  }),
  paddingBottom: value => ({
    paddingBottom: factor4(value)
  }),
  paddingLeft: value => ({
    paddingLeft: factor4(value)
  }),
  paddingX: value => ({
    paddingLeft: factor4(value),
    paddingRight: factor4(value)
  }),
  paddingY: value => ({
    paddingTop: factor4(value),
    paddingBottom: factor4(value)
  }),
  // flex
  flexGrow: value =>
    value && {
      flex: value === true ? '1 1 auto' : value
      // minHeight: 0,
      // minWidth: 0
    },
  wrap: value => ({
    flexWrap: value === true ? 'wrap' : value
  }),
  verticalCenter: value =>
    value && {
      alignItems: 'center'
    },
  horizontalCenter: value =>
    value && {
      justifyContent: 'center'
    },
  column: value => ({
    width: `${Math.round(value * 1e6) / 1e4}%`
  }),
  fit: value =>
    value && {
      maxWidth: '100%'
    },
  aspectRatio: value => ({
    paddingBottom: `${(1 / value) * 100}%`,
    height: 0
  }),
  hidden: value => !value && { visibility: 'hidden' },
  shape: value => shapes[value],
  italic: value => value && { fontStyle: 'italic' },
  bold: value => value && { fontWeight: 'bold' },
  size: value => sizes[value],
  block: value => value && { display: 'block', width: '100%' },
  inline: value => value && { display: 'inline-block' }
};
export default CustomCSSProps;
