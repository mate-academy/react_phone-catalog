import { ScrollLineCards } from '@/shared/components';

//import styles from './HotPrices.module.scss';
import products from '../../../../../public/api/products.json';

export const HotPrices = () => {
  const avaliableProducts = products
    .filter(item => item.category === 'phones')
    .sort((item1, item2) => item2.fullPrice - item1.fullPrice)
    .slice(0, 20);

  return (
    <ScrollLineCards
      title={'Hot prices'}
      data={avaliableProducts}
      discountProducts
    />
  );
};
