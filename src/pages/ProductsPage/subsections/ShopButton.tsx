import { FC } from 'react';
import { AddButton } from 'src/components/AddButtons';
import { Product } from 'src/types/Product';

type Props = {
  selectedProductGeneralInfo: Product,
  favourites: Product[],
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

export const ShopButton: FC<Props> = ({
  selectedProductGeneralInfo,
  favourites,
  setFavourites,
  cartProducts,
  setCartProducts,
}) => {
  return (
    <AddButton
      product={selectedProductGeneralInfo}
      favourites={favourites}
      setFavourites={setFavourites}
      cartProducts={cartProducts}
      setCartProducts={setCartProducts}
    />
  );
};
