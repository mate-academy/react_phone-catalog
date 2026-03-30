/* eslint-disable max-len */
import style from './HotPrices.module.scss';
import { ProductSwiper } from '../../../../components/ProductSwiper/ProductSwiper';
import { useProductsContext } from '../../../../store/ProductsContext';

export const HotPrices = () => {
  const { products, isLoading } = useProductsContext();

  const hotProducts = [...products]
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  return (
    <div className={style.HotPrices}>
      <ProductSwiper
        products={hotProducts}
        title={'Hot prices'}
        fullPrice={true}
        isLoading={isLoading}
      />
    </div>
  );
};
