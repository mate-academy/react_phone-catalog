export const getFormattedGBString = (str: string) => {
  return str.replace(/(\d+)GB/g, '$1 GB');
};
