/* eslint-disable no-restricted-syntax */
import '../../styles/components/ProductSlider/ProductSlider.scss';
import { useState } from 'react';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';
import { Button } from '../Button';
import { Item } from '../../types/storageItem';

type Props = {
  title: string;
  products: Product[];
  isIncluded: (items: Item<Product>[], value: Product) => boolean;
  cart: Item<Product>[];
  fav: Item<Product>[];
  onSelectedClick: (value: Product) => void;
  onFavClick: (value: Product) => void;
};

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  cart,
  fav,
  isIncluded,
  onSelectedClick,
  onFavClick,
}) => {
  const [page, setPage] = useState(0);

  const pages = Math.ceil(products.length / 4) - 1;

  const indent = (272 + 16) * 4 * page;
  const transform = `translate(-${indent}px, 0)`;

  const handleSlideLeft = () => {
    setPage(page - 1);
  };

  const handleSlideRight = () => {
    setPage(page + 1);
  };

  return (
    <section className="product-slider">
      <div className="product-slider__header-container">
        <h1 className="product-slider__title">{title}</h1>

        <div className="product-slider__buttons">
          <Button
            content="arrow"
            arrowDirection="left"
            disabled={page === 0}
            onClick={handleSlideLeft}
          />
          <Button
            content="arrow"
            arrowDirection="right"
            disabled={page === pages}
            onClick={handleSlideRight}
          />
        </div>
      </div>

      <div className="product-slider__card-container">
        <ul className="product-slider__content-list" style={{ transform }}>
          {products.map(product => (
            <li key={product.id}>
              <ProductCard
                product={product}
                isSelected={isIncluded(cart, product)}
                isFavourite={isIncluded(fav, product)}
                onSelectedClick={() => onSelectedClick(product)}
                onFavouritesClick={() => onFavClick(product)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
