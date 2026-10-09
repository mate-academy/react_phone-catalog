import style from './NewModele.module.scss';
import '../../../../style/GlobalStyle.scss';
import { useAppSelector } from '../../../../app/hooks';
import { ProductsSlider } from '../../../../app/ProductSlider/ProductSlider';

export const NewModele = () => {
  const products = useAppSelector(state => state.products.items) || [];

  const newProducts = [...products].sort((a, b) => b.year - a.year);

  return (
    <div className={style['new-modele']}>
      <ProductsSlider
        title="Brand new models"
        products={newProducts}
        hasDiscount={false}
      />
    </div>
  );
};
