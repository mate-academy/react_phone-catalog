export const numberOfPaginations = (
  itemsOnPage: string | null,
  productsLength: number | null,
) => {
  const arrayOfnumberPaginations = [];

  let numberOfPagination = null;

  if (productsLength && itemsOnPage) {
    numberOfPagination = Math.ceil(productsLength / +itemsOnPage);
  }

  if (numberOfPagination) {
    for (let i = 1; i <= numberOfPagination; i++) {
      arrayOfnumberPaginations.push(i);
    }
  }

  return arrayOfnumberPaginations;
};
