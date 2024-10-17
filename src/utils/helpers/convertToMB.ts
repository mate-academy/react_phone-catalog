export const convertToMB = (value: string) => {
  const unit = value.slice(-2);
  const number = parseFloat(value);

  if (unit === 'GB') {
    return number * 1024;
  }
  return number;
};
