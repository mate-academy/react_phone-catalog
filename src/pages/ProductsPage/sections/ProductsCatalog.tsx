import { FC } from 'react';
import { ProductCard } from 'src/pages/ProductsPage/sections/ProductCard';
import { Product } from 'src/types/Product';

type Props = {
  currentProducts: Product[],
  favourites: Product[],
  setFavourites:React.Dispatch<React.SetStateAction<Product[]>>,
  cartProducts: Product[],
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
};

export const ProductsCatalog: FC<Props> = ({
  currentProducts,
  favourites,
  setFavourites,
  cartProducts,
  setCartProducts,
}) => {
  return (
    <div className="product-section__catalog">
      {currentProducts.map(product => {
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
