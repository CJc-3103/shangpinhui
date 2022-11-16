export default function extendClass(
  defaultBlockClass,
  extraBlockClass = '',
  elementClasses = {},
  elementPrefix = '__'
) {
  let realBlockClass = defaultBlockClass;
  let realElementClasses = {};
  Object.entries(elementClasses).forEach(([key, val]) => {
    realElementClasses[key] = `${defaultBlockClass}${elementPrefix}${val}`;
  });
  if (typeof extraBlockClass === 'string' && extraBlockClass !== '') {
    realBlockClass = `${realBlockClass} ${extraBlockClass}`;
    Object.entries(elementClasses).forEach(([key, val]) => {
      realElementClasses[
        key
      ] = `${realElementClasses[key]} ${extraBlockClass}${elementPrefix}${val}`;
    });
  }
  return {
    realBlockClass,
    realElementClasses,
  };
}
