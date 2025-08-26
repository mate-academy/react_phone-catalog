// eslint-disable-next-line max-len
import { ButtonArrow } from '../../../shared/components/ButtonArrow/ButtonArrow';
import scss from './ProductsSlider.module.scss';

export const ProductsSlider = () => {
  return (
    <div className={scss.slider}>
      <div className={scss.slider__header}>
        <h2 className={scss.slider__header_title}>Brand new models</h2>
        <div className={scss.slider__header_buttons}>
          <ButtonArrow direction="left" />
          <ButtonArrow direction="right" />
        </div>
      </div>
    </div>
  );
};
