export const transformToUpperCase = (value: string) => {
  return value === 'ram' ? 'RAM' : value[0].toUpperCase() + value.slice(1);
};
