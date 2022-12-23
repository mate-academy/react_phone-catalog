import { FC } from 'react';
import { Product } from 'src/types/Product';
import { KeenSlider } from 'src/components/KeenSlider';
import { ProductCard } from 'src/components/ProductCard';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

type Props = {
  sectionTitle: string,
  renderedProducts: Product[],
};

export const SliderSection: FC<Props> = ({
  sectionTitle,
  renderedProducts,
}) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', '');
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '');

  return (
    <>
      <div className="slider-section phones-section">
        <div className="hot-prices__title">
          <h1>{sectionTitle}</h1>
        </div>

        <div
          data-cy="cardsContainer"
          className="slider-section__catalog"
        >
          <KeenSlider>
            {renderedProducts.map((renderedProduct) => {
              return (
                <ProductCard
                  key={renderedProduct.id}
                  isSlide
                  product={renderedProduct}
                  favourites={favourites}
                  setFavourites={setFavourites}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                />
              );
            })}
          </KeenSlider>
        </div>
      </div>

    </>
  );
};
