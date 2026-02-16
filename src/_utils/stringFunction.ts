export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const addSpace = (str: string): string =>
  str.replace(/(\S)(GB)/g, '$1 $2').replace(/(,)(\S)/g, '$1 $2');
