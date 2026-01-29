/* eslint-disable max-len */

import s from './GoodsSlider.module.scss';

import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsContext } from '../../Context/ProductsContext';
import { useContextSelector } from 'use-context-selector';
import { Pagination } from '../Pagination';
import { useMemo, useState } from 'react';
// import { ReactComponent as Right } from '/img/icons/Stroke_right.svg';

type Props = {
  collectionType: string;
  typePagin?: string;
};

export const GoodsSlider: React.FC<Props> = ({ collectionType }) => {
  const products = useContextSelector(ProductsContext, ctx => ctx.products);
  const [page, setPage] = useState(1);

  const sortedProducts = useMemo(() => {
    switch (collectionType) {
      case 'alsoLike':
        return [...products].sort(() => Math.random() - 0.5);
      // .filter(item => item.itemId !== product?.itemId)
      case 'new':
        return (
          [...products]
            .sort((itemA, itemB) => itemB.year - itemA.year)
            // .filter(it => Math.max(it.year))
            .sort(() => Math.random() - 0.5)
        );
      case 'hot':
        return [...products]
          .sort((itemA, itemB) => itemB.price - itemA.price)
          .sort(() => Math.random() - 0.5);

      default:
        return [];
    }
  }, [products, collectionType]);

  const totalPages = sortedProducts.length / 4;

  function onChangePageClick(pageNum: number) {
    setPage(pageNum);
  }

  const visibleProducts = useMemo(() => {
    return sortedProducts.slice((page - 1) * 4, page * 4);
  }, [sortedProducts, page]);

  return (
    <div className={`${s.goods_slider}`}>
      <Pagination
        type={'light'}
        pages={totalPages}
        current={page}
        onPageClick={onChangePageClick}
      />
      <div className="columns">
        {visibleProducts.map(product => (
          <div className="column p-0" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
