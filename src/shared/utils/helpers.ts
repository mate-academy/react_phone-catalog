export const capitalize = (string: string) => {
  const stringsArr = string.split(' ');

  const capitalizedArr = stringsArr.map(str => {
    return `${str[0].toUpperCase()}${str.substring(1)}`;
  });

  return capitalizedArr.join(' ');
};

export const extractBreakPoints = () => {
  const root = getComputedStyle(document.documentElement);

  return ['--breakpoint-lg', '--breakpoint-md'].map(value =>
    parseInt(root.getPropertyValue(value)),
  );
};
