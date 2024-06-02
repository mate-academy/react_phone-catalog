import { Product } from './Product';

export const handleFavorites = (
  chosen: Product[],
  product: Product,
  setChosen: (product: Product[]) => void,
  sameChosen: boolean,
) => {
  if (!sameChosen) {
    setChosen([...chosen, { ...product }]);
  } else {
    const newChosen = chosen.filter(fav => fav.id !== product.id);

    setChosen(newChosen);
  }
};

export const handleAddButton = (
  chosen: Product[],
  product: Product,
  setChosen: (product: Product[]) => void,
  sameChosen: boolean,
) => {
  if (!sameChosen) {
    setChosen([...chosen, { ...product, quantity: 1 }]);
  }
};
