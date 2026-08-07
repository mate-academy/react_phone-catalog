// .. ShopByCategory.tsx
import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';
import type { Product } from '../../../../types/Product';

import phonesImg from '../../../../assets/images/category/phones.png';
import tabletsImg from '../../../../assets/images/category/tablets.png';
import accessImg from '../../../../assets/images/category/accessories.png';

interface ShopByCategoryProps {
  products: Product[];
}

export const ShopByCategory = ({ products }: ShopByCategoryProps) => {
  const phones = products.filter(phone => phone.category === 'phones');
  const tablets = products.filter(phone => phone.category === 'tablets');
  const accessories = products.filter(
    phone => phone.category === 'accessories',
  );

  return (
    <section className={styles.shopByCategory}>
      <div className="shopByCategory__container">
        <div className={styles.body}>
          <h2 className={`${styles.title} section-title-h2`}>
            Shop by category
          </h2>
          <ul className={styles.list}>
            <li className={styles.li}>
              <Link to="/phones" className={styles.link}>
                {/* 1. Створюємо фоновий блок-обгортку навколо картинки */}
                <div className={styles.imageWrapper}>
                  <img
                    src={phonesImg}
                    alt="category-phones"
                    className={styles.image}
                  />
                </div>

                {/* 2. Опис залишається ПОЗА фоновим блоком */}
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>Mobile phones</h3>
                  <p className={styles.descriptionModels}>
                    <span>{phones.length}</span> models
                  </p>
                </div>
              </Link>
            </li>
            <li className={styles.li}>
              <Link to="/tablets" className={styles.link}>
                <div className={styles.imageWrapper}>
                  <img
                    src={tabletsImg}
                    alt="category-tablets"
                    className={styles.image}
                  />
                </div>
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>Tablets</h3>
                  <p className={styles.descriptionModels}>
                    <span>{tablets.length}</span> models
                  </p>
                </div>
              </Link>
            </li>
            <li className={styles.li}>
              <Link to="/accessories" className={styles.link}>
                <div className={styles.imageWrapper}>
                  <img
                    src={accessImg}
                    alt="category-accessories"
                    className={styles.image}
                  />
                </div>
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>Accessories</h3>
                  <p className={styles.descriptionModels}>
                    <span>{accessories.length}</span> models
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
