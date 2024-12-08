export const numberOfPaginations = (
  itemsOnPage: string | null, 
  productsLength: number | null
) => {
  const arrayOfnumberPaginations = [];

  let numberOfPaginations = null;

  if (productsLength && itemsOnPage) {
    numberOfPaginations = Math.ceil(productsLength / +itemsOnPage);
  }

  if (numberOfPaginations) {
    for (let i = 1; i <= numberOfPaginations; i++) {
      arrayOfnumberPaginations.push(i);
    }
  }

  return arrayOfnumberPaginations;
}