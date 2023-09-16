/* eslint-disable no-restricted-syntax */
import '../../styles/components/ProductList/ProductList.scss';

import { Product } from '../../types/product';
import { Item } from '../../types/storageItem';
import { Storage } from '../../types/storages';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({
  products,
}) => {
  const [cart, setCart] = useLocalStorage<Item<Product>[]>([], Storage.CART);
  const [fav, setFav]
  = useLocalStorage<Item<Product>[]>([], Storage.FAVOURITES);

  const isIncluded = (items: Item<Product>[], value: Product) => {
    for (const item of items) {
      if (item.value.id === value.id) {
        return true;
      }
    }

    return false;
  };

  const handleSelectedClick = (value: Product) => {
    if (isIncluded(cart, value)) {
      setCart(prev => {
        return prev.filter(item => item.value.id !== value.id);
      });
    } else {
      setCart(prev => [...prev, { quantity: 1, value }]);
    }
  };

  const handleFavClick = (value: Product) => {
    if (isIncluded(fav, value)) {
      setFav(prev => {
        return prev.filter(item => item.value.id !== value.id);
      });
    } else {
      setFav(prev => [...prev, { quantity: 1, value }]);
    }
  };

  return (
    <section className="list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={isIncluded(cart, product)}
          isFavourite={isIncluded(fav, product)}
          onSelectedClick={() => handleSelectedClick(product)}
          onFavouritesClick={() => handleFavClick(product)}
        />
      ))}
    </section>
  );
};
