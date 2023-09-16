import '../../styles/components/ProductList/ProductList.scss';

import { Product } from '../../types/product';
import { Storage } from '../../types/storages';
import { useStorage } from '../../utils/hooks/useStorage';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({
  products,
}) => {
  const [manageCart, isCartIncluded]
    = useStorage<Product>([], Storage.CART as string);
  const [manageFavourites, isFavouritesIncluded]
    = useStorage<Product>([], Storage.FAVOURITES as string);

  return (
    <section className="list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={isCartIncluded(product)}
          isFavourite={isFavouritesIncluded(product)}
          onSelectedClick={() => manageCart(product)}
          onFavouritesClick={() => manageFavourites(product)}
        />
      ))}
    </section>
  );
};
