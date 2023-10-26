import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

export const updateFavourites = (
  chosenProducts: Product[],
  setChosenProducts: (items: Product[]) => void,
  setLoadingItem: (ind: string) => void,
  event: React.SyntheticEvent,
  item: Product,
  favouritesTimeout = 0,
) => {
  event.preventDefault();

  const productToManipulate
    = chosenProducts.find(device => device.id === item.id);

  if (!productToManipulate) {
    const toFavourites = [
      ...chosenProducts,
      item,
    ];

    setChosenProducts(toFavourites);

    // eslint-disable-next-line
    console.log(toFavourites, 'adding')
  } else {
    setLoadingItem(productToManipulate.id);

    const toFavourites = chosenProducts.filter(device => device.id !== item.id);

    setTimeout(() => {
      setChosenProducts(toFavourites);
      setLoadingItem('');
    }, favouritesTimeout);

    // eslint-disable-next-line
    console.log(toFavourites, 'deleting')
  }
};

export const updateCart = (
  productsToBuy: CartProduct[],
  setProductsToBuy: (items: CartProduct[]) => void,
  event: React.SyntheticEvent,
  item: Product,
) => {
  event.preventDefault();

  if (!(productsToBuy.find(device => device.id === item.id))) {
    const toBuy = [
      ...productsToBuy,
      {
        id: item.id,
        quantity: 1,
        item,
      },
    ];

    // eslint-disable-next-line
    console.log(toBuy, 'toByu')

    setProductsToBuy(toBuy);
  }
};
