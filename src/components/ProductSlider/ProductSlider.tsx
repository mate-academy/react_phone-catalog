/* eslint-disable no-restricted-syntax */
import '../../styles/components/ProductSlider/ProductSlider.scss';
import { useState } from 'react';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';
import { Button } from '../Button';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { Item } from '../../types/storageItem';
import { Storage } from '../../types/storages';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
}) => {
  const [page, setPage] = useState(0);
  const [cart, setCart] = useLocalStorage<Item<Product>[]>([], Storage.CART);
  const [fav, setFav]
    = useLocalStorage<Item<Product>[]>([], Storage.FAVOURITES);

  const isIncluded = (items: Item<Product>[], value: Product) => {
    if (items.length > 0) {
      for (const item of items) {
        if (value && item.value.id === value.id) {
          return true;
        }
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
                onSelectedClick={() => handleSelectedClick(product)}
                onFavouritesClick={() => handleFavClick(product)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
