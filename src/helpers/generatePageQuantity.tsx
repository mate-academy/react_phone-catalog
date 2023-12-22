export const generatePageQuantity
= (productsLength: number, pageSize: number) => {
  const totalPage = Math.ceil(productsLength / pageSize);
  const pageNumbers = [];

  for (let i = 0; i <= totalPage; i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
