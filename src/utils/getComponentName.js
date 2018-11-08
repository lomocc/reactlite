function getComponentName(component) {
  if (typeof component === 'string') {
    return component;
  }
  return component.displayName || component.name;
}

export default getComponentName;
