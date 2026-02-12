import s from './NewModels.module.scss';
import 'swiper/css';
import { ProductsSlider } from '../ProductSlider';
import { useProductContext } from '../../context/ShopContext/ProductContext';

export const NewModels = () => {
  const { products } = useProductContext();
  const items = [...(products || [])].sort((a, b) => {
    return b.year - a.year;
  });

  return (
    <div className={s['new-models']}>
      <ProductsSlider
        products={items}
        title={'Brand new models'}
        isFullPrice={false}
      />
    </div>
  );
};
