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

export const generateImgUrls = (url: string) => {
  const strArr = url.split('.');

  if (strArr.length !== 2) {
    return [];
  }

  const urlsArr = ['sm', 'md', 'lg'].map(
    size => `${strArr.at(0)}-${size}.${strArr.at(1)}`,
  );

  return urlsArr;
};

export const replaceSpaceWithCharacter = (
  string: string,
  character?: string,
) => {
  return string.replace(' ', character ?? '-');
};
