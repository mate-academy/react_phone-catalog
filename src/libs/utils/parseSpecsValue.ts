export const parseSpecsValue = (value: string) => {
  if (!value) {
    return '-';
  }

  if (+value) {
    return value;
  }

  const number = parseFloat(value) || '';
  const text = value.replace(String(number), ' ');

  return number + text;
};
