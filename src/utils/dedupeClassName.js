const dedupeClassName = className => {
  const cache = {};
  return (
    className &&
    className
      .split(' ')
      .filter(part => {
        if (!cache[part]) {
          cache[part] = true;
          return true;
        }
      })
      .join(' ')
  );
};
export default dedupeClassName;
