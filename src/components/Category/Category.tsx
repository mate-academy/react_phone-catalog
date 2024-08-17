import classNames from 'classnames';
import styles from './Category.module.scss';
import { PRODUCTS_TITLE } from '../../constants/PRODUCTS_TITLE';
import { Link } from 'react-router-dom';
import { ProductCategories } from '../../types/ProductCategories';

type CategoryProps = {
  productCounts: Record<ProductCategories, number>;
};
export const Category: React.FC<CategoryProps> = ({ productCounts }) => {
  return (
    <section className="category" id="category">
      <h1 className="visually-hidden" id="home">
        Product Catalog
      </h1>
      <h3 className={styles.category__title}>Shop by category</h3>

      <div className={styles.category__wrapper}>
        {Object.entries(PRODUCTS_TITLE).map(title => {
          const [key, value] = title;

          return (
            <div key={key} className={classNames(styles.category__card)}>
              <Link
                to={`${key}`}
                className={classNames(
                  styles.category__link,
                  styles[`category__link--${key}`],
                )}
              ></Link>

              <div className={styles.category__details}>
                <h4 className="category__subTitle">{value}</h4>
                <p className="body-text">
                  {productCounts[key as ProductCategories]} models
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
