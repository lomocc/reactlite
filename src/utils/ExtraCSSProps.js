const borderRadius = '0.25em';
const shapeStyles = {
  square: { borderRadius: 0 },
  circle: { borderRadius: '50%' },
  pill: { borderRadius: '999px' },
  rounded: { borderRadius: `${borderRadius}` },
  roundedTop: { borderRadius: `${borderRadius} ${borderRadius} 0 0` },
  roundedRight: {
    borderRadius: `0 ${borderRadius} ${borderRadius} 0`
  },
  roundedBottom: {
    borderRadius: `0 0 ${borderRadius} ${borderRadius}`
  },
  roundedLeft: { borderRadius: `${borderRadius} 0 0 ${borderRadius}` }
};
const ExtraCSSProps = {
  top: value => ({ top: value === true ? 0 : value }),
  right: value => ({ right: value === true ? 0 : value }),
  bottom: value => ({ bottom: value === true ? 0 : value }),
  left: value => ({ left: value === true ? 0 : value }),
  // margin
  margin: value => ({
    margin: typeof value === 'number' ? value * 4 : value
  }),
  marginTop: value => ({
    marginTop: typeof value === 'number' ? value * 4 : value
  }),
  marginRight: value => ({
    marginRight: typeof value === 'number' ? value * 4 : value
  }),
  marginBottom: value => ({
    marginBottom: typeof value === 'number' ? value * 4 : value
  }),
  marginLeft: value => ({
    marginLeft: typeof value === 'number' ? value * 4 : value
  }),
  // padding
  padding: value => ({
    padding: typeof value === 'number' ? value * 4 : value
  }),
  paddingTop: value => ({
    paddingTop: typeof value === 'number' ? value * 4 : value
  }),
  paddingRight: value => ({
    paddingRight: typeof value === 'number' ? value * 4 : value
  }),
  paddingBottom: value => ({
    paddingBottom: typeof value === 'number' ? value * 4 : value
  }),
  paddingLeft: value => ({
    paddingLeft: typeof value === 'number' ? value * 4 : value
  }),
  paddingX: value => ({
    paddingLeft: typeof value === 'number' ? value * 4 : value,
    paddingRight: typeof value === 'number' ? value * 4 : value
  }),
  paddingY: value => ({
    paddingTop: typeof value === 'number' ? value * 4 : value,
    paddingBottom: typeof value === 'number' ? value * 4 : value
  }),
  // flex
  flexGrow: value =>
    value && {
      flex: value === true ? '1 1 auto' : value
      // minHeight: 0,
      // minWidth: 0
    },
  flexWrap: value => ({
    flexWrap: value === true ? 'wrap' : value
  }),
  flexCenter: value =>
    value && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
  widthRatio: value => ({ width: `${value * 100}%` }),
  heightRatio: value => ({ height: `${value * 100}%` }),
  aspectRatio: value => ({
    paddingBottom: `${(1 / value) * 100}%`,
    height: 0
  }),
  visible: value => !value && { display: 'none' },
  mouseEnabled: value => !value && { pointerEvents: 'none' },
  shape: value => shapeStyles[value]
};
export default ExtraCSSProps;
