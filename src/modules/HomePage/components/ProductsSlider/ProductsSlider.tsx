import { useContext } from 'react';
// eslint-disable-next-line max-len
import { ButtonArrow } from '../../../shared/components/ButtonArrow/ButtonArrow';
// eslint-disable-next-line max-len
import { ProductCard } from '../../../shared/components/ProductCard/ProductCard';
import scss from './ProductsSlider.module.scss';
import { DataContext } from '../../../../context/ContextProvider';

export const ProductsSlider: React.FC = () => {
  const { products } = useContext(DataContext);

  return (
    <div className={scss.slider}>
      <div className={scss.slider__header}>
        <h2 className={scss.slider__header_title}>Brand new models</h2>
        <div className={scss.slider__header_buttons}>
          <ButtonArrow direction="left" />
          <ButtonArrow direction="right" />
        </div>
      </div>
      <div className={scss.slider__productCard}>
        {products[0] && <ProductCard product={products[0]} discount={false} />}
      </div>
    </div>
  );
};
