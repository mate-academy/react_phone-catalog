/* eslint-disable max-len */
import style from './NewModels.module.scss';
import { ProductSwiper } from '../../../../components/ProductSwiper/ProductSwiper';
import { useProductsContext } from '../../../../store/ProductsContext';

export const NewModels = () => {
  const { products, isLoading } = useProductsContext();

  const newProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  return (
    <div className={style.newModels}>
      <ProductSwiper
        products={newProducts}
        title={'Brand new models'}
        fullPrice={false}
        isLoading={isLoading}
      />
    </div>
  );
};
