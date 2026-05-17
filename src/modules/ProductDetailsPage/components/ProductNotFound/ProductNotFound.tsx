import { ButtonBack } from '../../../../shared/ui/ButtonBack';
import style from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <div className={style.wrapper}>
      <ButtonBack />
      <p className={style.text}>Product was not found</p>
      <img src="./img/product-not-found.png" alt="productNotFound" />
    </div>
  );
};
