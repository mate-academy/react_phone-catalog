export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

export const getPlural = (str: string) => {
  if (str.charAt(str.length - 1) === 'y') {
    return `${str.slice(0, str.length - 1)}ies`;
  }

  return `${str}s`;
};
