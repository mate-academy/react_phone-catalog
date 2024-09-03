import styles from './homeface.module.scss';
import column from '../../grid.module.scss';
import classNames from 'classnames';
import { CardComponent } from '../../main/CardComponent/CardComponent';
// import { usePhones } from '../../../context/PhonesProvider';
import { useProducts } from '../../../context/ProductsProvider';
// import { useAccessories } from '../../../context/AccessoriesProvider';
// import { useTablets } from '../../../context/TabletProvider';

export const ProductsSlider = () => {
  // const phones = usePhones();
  const products = useProducts();
  // const accessories = useAccessories();
  // const tablets = useTablets();

  return (
    <>
      <div className={column.grid_h2}>
        <h2 className={styles.home_font_h2}>Brand new models</h2>
      </div>

      <button
        className={classNames(
          styles.product_slide_buttons,
          column.grid_h2_button_left,
        )}
      >
        &lt;
      </button>

      <button
        className={classNames(
          styles.product_slide_buttons,
          column.grid_h2_button_right,
        )}
      >
        &gt;
      </button>

      <CardComponent devices={products} />
    </>
  );
};
