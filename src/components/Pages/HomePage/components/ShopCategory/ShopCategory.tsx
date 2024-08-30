/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import styles from './ShopCategory.module.scss';
import AppleIcon from '@mui/icons-material/Apple';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';
import { useContext } from 'react';
import classNames from 'classnames';

export const ShopCategory = () => {
  const { products, isSunSelected } = useContext(GlobalContext);

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <section className={styles.category}>
      <h2
        className={classNames(styles.category__title, {
          [styles.category__title_dark]: !isSunSelected,
        })}
      >
        Shop by category
      </h2>

      <div className={styles.category__list}>
        <div className={styles.category__item}>
          <Link to={'phones'} className={styles.category__phones}>
            <div className={styles.category__phones_img}>
              <div className={styles.category__phones_hover}>
                <p className={styles.category__phones_hover_name}>Phones</p>
                <AppleIcon className={styles.category__phones_hover_icon} />
              </div>
            </div>
          </Link>

          <div className={styles.category__link_container}>
            <Link
              to={'phones'}
              className={classNames(styles.category__phones_title, {
                [styles.category__phones_title_dark]: !isSunSelected,
              })}
            >
              Phones
            </Link>

            <span className={styles.category__phones_count}>
              {`${phones.length} models`}
            </span>
          </div>
        </div>

        <div className={styles.category__item}>
          <Link to={'tablets'} className={styles.category__tablets}>
            <div className={styles.category__tablets_img}>
              <div className={styles.category__phones_hover}>
                <p className={styles.category__phones_hover_name}>Tablets</p>
                <AppleIcon className={styles.category__phones_hover_icon} />
              </div>
            </div>
          </Link>

          <div className={styles.category__link_container}>
            <Link
              to={'tablets'}
              className={classNames(styles.category__tablets_title, {
                [styles.category__tablets_title_dark]: !isSunSelected,
              })}
            >
              Tablets
            </Link>

            <span className={styles.category__tablets_count}>
              {`${tablets.length} models`}
            </span>
          </div>
        </div>

        <div className={styles.category__item}>
          <Link to={'accessories'} className={styles.category__accessories}>
            <div className={styles.category__accessories_img}>
              <div className={styles.category__phones_hover}>
                <p className={styles.category__phones_hover_name}>
                  Accessories
                </p>
                <AppleIcon className={styles.category__phones_hover_icon} />
              </div>
            </div>
          </Link>

          <div className={styles.category__link_container}>
            <Link
              to={'accessories'}
              className={classNames(styles.category__accessories_title, {
                [styles.category__accessories_title_dark]: !isSunSelected,
              })}
            >
              Accessories
            </Link>

            <span className={styles.category__accessories_count}>
              {`${accessories.length} models`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
