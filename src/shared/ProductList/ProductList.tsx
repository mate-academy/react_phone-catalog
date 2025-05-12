import { useState } from 'react';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';
import s from './ProductList.module.scss';
import { ArrowLeftSVG } from '../../assets/ArrowLeftSVG';
import { ArrowRightSVG } from '../../assets/ArrowRightSVG';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [page, setPage] = useState(0);
  const isLeftDisabled = page - 4 < 0;
  const isRightDisabled = page + 4 > products.length;

  return (
    <div className={s.products}>
      <div className={s.products__controls}>
        <span className={s.products__title}>Brand new models</span>
        <div className={s.products__controls__buttons}>
          <button
            disabled={isLeftDisabled}
            className={s.products__controls__button}
            onClick={() => setPage(page - 4)}
          >
            <ArrowLeftSVG isDisabled={isLeftDisabled} />
          </button>
          <button
            className={s.products__controls__button}
            onClick={() => setPage(page + 4)}
            disabled={isRightDisabled}
          >
            <ArrowRightSVG isDisabled={isRightDisabled} />
          </button>
        </div>
      </div>
      <div className={s.list}>
        {products.slice(page, page + 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
