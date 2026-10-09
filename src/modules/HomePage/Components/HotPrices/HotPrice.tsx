import style from './HotPrice.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import { ProductsSlider } from '../../../../app/ProductSlider/ProductSlider';

export const HotPrice = () => {
  const products = useAppSelector(state => state.products.items) || [];

  const hotProducts = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <div className={style['hot-price-block']}>
      <ProductsSlider title="Hot prices" products={hotProducts} />
    </div>
  );
};
