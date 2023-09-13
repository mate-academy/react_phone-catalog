import '../../styles/components/ProductList/ProductList.scss';

import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  selected: Product[];
  favourites: Product[];
  onSelectedClick: () => void;
  onFavouritesClick: () => void;
};

export const ProductList: React.FC<Props> = ({
  products,
  selected,
  favourites,
  onSelectedClick,
  onFavouritesClick,
}) => {
  return (
    <section className="list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selected.includes(product)}
          isFavourite={favourites.includes(product)}
          onSelectedClick={onSelectedClick}
          onFavouritesClick={onFavouritesClick}
        />
      ))}
    </section>
  );
};
