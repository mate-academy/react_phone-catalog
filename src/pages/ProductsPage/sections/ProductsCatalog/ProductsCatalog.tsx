import { FC } from 'react';
import {
  ProductCard,
} from 'src/pages/ProductsPage/sections/ProductCard/ProductCard';
import { Product } from 'src/types/Product';
import './ProductsCatalog.scss';

type Props = {
  currentItems: Product[],
  favourites: Product[],
  setFavourites:React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

export const ProductsCatalog: FC<Props> = ({
  currentItems,
  favourites,
  setFavourites,
  cartProducts,
  setCartProducts,
}) => {
  return (
    <div className="product-section__catalog" data-cy="productList">
      {currentItems.map(product => {
        return (
          <ProductCard
            key={product.id}
            isSlide={false}
            product={product}
            favourites={favourites}
            setFavourites={setFavourites}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        );
      })}
    </div>
  );
};
