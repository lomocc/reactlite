const roundedBorderRadius = '0.25em';
const shapeTypes = {
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
const enhanceStyles = {
  top: value => ({ top: value === true ? 0 : value }),
  right: value => ({ right: value === true ? 0 : value }),
  bottom: value => ({ bottom: value === true ? 0 : value }),
  left: value => ({ left: value === true ? 0 : value }),
  paddingX: value => ({
    paddingLeft: value,
    paddingRight: value
  }),
  paddingY: value => ({
    paddingTop: value,
    paddingBottom: value
  }),
  widthRatio: value => ({ width: `${value * 100}%` }),
  heightRatio: value => ({ height: `${value * 100}%` }),
  aspectRatio: value => ({
    paddingBottom: `${(1 / value) * 100}%`,
    height: 0
  }),
  shape: value => shapeTypes[value]
};
export default enhanceStyles;
