/* eslint-disable no-restricted-syntax */
import '../../styles/components/ProductList/ProductList.scss';

import { Product } from '../../types/product';
import { Item } from '../../types/storageItem';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  isIncluded: (items: Item<Product>[], value: Product) => boolean;
  cart: Item<Product>[];
  fav: Item<Product>[];
  onSelectedClick: (value: Product) => void;
  onFavClick: (value: Product) => void;
};

export const ProductList: React.FC<Props> = ({
  products,
  isIncluded,
  cart,
  fav,
  onSelectedClick,
  onFavClick,
}) => {
  return (
    <section className="list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={isIncluded(cart, product)}
          isFavourite={isIncluded(fav, product)}
          onSelectedClick={() => onSelectedClick(product)}
          onFavouritesClick={() => onFavClick(product)}
        />
      ))}
    </section>
  );
};
