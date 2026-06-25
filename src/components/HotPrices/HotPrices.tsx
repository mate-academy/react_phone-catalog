import { useProductContext } from '../../context/ShopContext/ProductContext';

import { ProductsSlider } from '../ProductSlider';
import s from './HotPrices.module.scss';

export const HotPrices = () => {
  const { products } = useProductContext();

  const items = [...(products || [])].sort((a, b) => {
    return a.fullPrice - a.price - (b.fullPrice - b.price);
  });

  return (
    <div className={s['hot-prices']}>
      <ProductsSlider products={items} title={'Hot prices'} />
    </div>
  );
};
