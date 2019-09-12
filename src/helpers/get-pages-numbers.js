const getPageNumbers = (itemsPerPage, itemsNumber) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(itemsNumber / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

export default getPageNumbers;
