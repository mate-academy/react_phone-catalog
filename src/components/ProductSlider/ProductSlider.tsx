import { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
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
        <h2 className="product-slider__title">{title}</h2>

        <div className="product-slider__buttons">
          <button
            type="button"
            className={classNames(
              'product-slider__button',
              'product-slider__button--left',
              {
                disabled: page === 0,
              },
            )}
            onClick={handleSlideLeft}
            disabled={page === 0}
          >
            &lt;
          </button>
          <button
            type="button"
            className={classNames(
              'product-slider__button',
              'product-slider__button--right',
              {
                disabled: page === pages,
              },
            )}
            onClick={handleSlideRight}
            disabled={page === pages}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="product-slider__card-container">
        <ul className="product-slider__content-list" style={{ transform }}>
          {products.map(product => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
