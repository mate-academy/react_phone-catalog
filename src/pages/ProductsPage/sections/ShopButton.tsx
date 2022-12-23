import { FC } from 'react';
import { AddButton } from 'src/components/AddButtons';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { Product } from 'src/types/Product';

type Props = {
  selectedProductGeneralInfo: Product,
};

export const ShopButton: FC<Props> = ({
  selectedProductGeneralInfo,
}) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', '');
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '');

  return (
    <AddButton
      favourites={favourites}
      setFavourites={setFavourites}
      cartProducts={cartProducts}
      setCartProducts={setCartProducts}
      product={selectedProductGeneralInfo}
    />
  );
};
