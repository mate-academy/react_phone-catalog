import { UseHooks } from '../../AppHooks';
import styles from './Categories.module.scss';
import phonesCategoryPicture from '../../../public/img/phonesCategory.svg';
import tabsCategoryPicture from '../../../public/img/tabletsCategory.svg';
import acsCategoryPicture from '../../../public/img/acsCategory.svg';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const { allProducts } = UseHooks();

  return (
    <>
      <div className="inlineContainer componentContainer">
        <h2 className={styles.name}>Shop by category</h2>
        <div className="gridContainer">
          <Link className={styles.link} to={'/phones?sort=age'}>
            <div className={styles.category}>
              <div
                className={classNames(
                  styles.category__background,
                  styles['category__background--phones'],
                )}
              >
                <img
                  className={classNames(
                    styles.category__image,
                    styles['category__image--phones'],
                  )}
                  src={phonesCategoryPicture}
                  alt="category1"
                />
              </div>
              <h4 className={styles.category__name}>Mobile phones</h4>
              <p className={classNames(styles.category__desc, 'body-text')}>
                {allProducts.filter(prod => prod.category === 'phones').length}
                {' models'}
              </p>
            </div>
          </Link>
          <Link className={styles.link} to={'/tablets?sort=age'}>
            <div className={styles.category}>
              <div
                className={classNames(
                  styles.category__background,
                  styles['category__background--tablets'],
                )}
              >
                <img
                  className={classNames(
                    styles.category__image,
                    styles['category__image--tablets'],
                  )}
                  src={tabsCategoryPicture}
                  alt="category2"
                />
              </div>
              <h4 className={styles.category__name}>Tablets</h4>
              <p className={classNames(styles.category__desc, 'body-text')}>
                {allProducts.filter(prod => prod.category === 'tablets').length}
                {' models'}
              </p>
            </div>
          </Link>
          <Link className={styles.link} to={'/accessories?sort=age'}>
            <div className={styles.category}>
              <div
                className={classNames(
                  styles.category__background,
                  styles['category__background--accessories'],
                )}
              >
                <img
                  className={classNames(
                    styles.category__image,
                    styles['category__image--accessories'],
                  )}
                  src={acsCategoryPicture}
                  alt="category3"
                />
              </div>
              <h4 className={styles.category__name}>Accessories</h4>
              <p className={classNames(styles.category__desc, 'body-text')}>
                {
                  allProducts.filter(prod => prod.category === 'accessories')
                    .length
                }
                {' models'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
