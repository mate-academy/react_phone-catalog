import { useMemo, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsContext } from '../../Context/ProductsContext';
import { Pagination } from '../Pagination';
import { useScreenSizeHook } from '../../hooks/screenSizeHook';

import s from './GoodsSlider.module.scss';

type Props = {
  collectionType: string;
  typePagin?: string;
};

export const GoodsSlider: React.FC<Props> = ({ collectionType }) => {
  const products = useContextSelector(ProductsContext, ctx => ctx.products);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const sortedProducts = useMemo(() => {
    switch (collectionType) {
      case 'alsoLike':
        return [...products].sort(() => Math.random() - 0.5);
      case 'new':
        return [...products]
          .sort((itemA, itemB) => itemB.year - itemA.year)
          .sort(() => Math.random() - 0.5);
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

  const { width } = useScreenSizeHook();

  const visibleProducts = useMemo(() => {
    if (width) {
      if (width >= 1200) {
        setPerPage(4);
      }

      if (width >= 768 && width < 1200) {
        setPerPage(3);
      }

      if (width >= 640 && width < 768) {
        setPerPage(2);
      }

      if (width < 640) {
        setPerPage(1);
      }
    }

    return sortedProducts.slice((page - 1) * perPage, page * perPage);
  }, [sortedProducts, page, perPage, width]);

  return (
    <>
      <Pagination
        type={'light'}
        pages={totalPages}
        current={page}
        onPageClick={onChangePageClick}
      />
      <div className={`columns is-flex ${s.goods_slider__container}`}>
        {visibleProducts?.map(product => (
          <div
            className={`column p-0 ${s.goods_slider__item}`}
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};
