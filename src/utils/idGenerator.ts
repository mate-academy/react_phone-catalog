export const idGenerator = () => {
  return `ID: ${Math.ceil(Math.random() * 999999)
    .toString()
    .padStart(6, '0')}`;
};
