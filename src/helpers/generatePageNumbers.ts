export const generatePageNumbers = (phonesLength: number, pageSize: number) => {
  const totalPageCount = Math.ceil(phonesLength / pageSize);
  const pageNumbers = [];

  for (let i = 1; i <= totalPageCount; i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
