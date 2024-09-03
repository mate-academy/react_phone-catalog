import styles from './homeface.module.scss';
import row from './productSlider.module.scss';
import classNames from 'classnames';
import { CardComponent } from '../../main/CardComponent/CardComponent';
// import { usePhones } from '../../../context/PhonesProvider';
import { useProducts } from '../../../context/ProductsProvider';
import { ShopingCard } from './ShopingCard';
// import { useAccessories } from '../../../context/AccessoriesProvider';
// import { useTablets } from '../../../context/TabletProvider';

export const ProductsSlider = () => {
  // const phones = usePhones();
  const products = useProducts();
  // const accessories = useAccessories();
  // const tablets = useTablets();

  return (
    <>
      <div className={row.slider}>
        <div>
          <h2 className={styles.home_font_h2}>Brand new models</h2>
        </div>

        <div className={row.slider_buttons}>
          <button className={classNames(styles.product_slide_buttons)}>
            &lt;
          </button>

          <button className={classNames(styles.product_slide_buttons)}>
            &gt;
          </button>
        </div>
      </div>

      <div className={row.slider_card}>
        <CardComponent devices={products} />
      </div>

      <div className={row.slider_shop}>
        <h2 className={styles.home_font_h2}>Shop by category</h2>
        <ShopingCard />
      </div>

      <div className={row.slider}>
        <div>
          <h2 className={styles.home_font_h2}>Hot prices</h2>
        </div>

        <div className={row.slider_buttons}>
          <button className={classNames(styles.product_slide_buttons)}>
            &lt;
          </button>

          <button className={classNames(styles.product_slide_buttons)}>
            &gt;
          </button>
        </div>
      </div>

      <div className={classNames(row.slider_card, row.slider_prev)}>
        <CardComponent devices={products} />
      </div>
    </>
  );
};
