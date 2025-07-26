import { Product } from '../../../../types/Product';
import Phones from '../../../../assets/images/Phones.png';
import Tablets from '../../../../assets/images/Tablets.png';
import Accessories from '../../../../assets/images/Accessories.png';
import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const categories = [
    { name: 'phones', label: 'Mobile phones', img: Phones },
    { name: 'tablets', label: 'Tablets', img: Tablets },
    { name: 'accessories', label: 'Accessories', img: Accessories },
  ];

  return (
    <section className={styles.category}>
      <div className="container">
        <h2 className="section-title">Shop by category</h2>

        <ul className={styles.category__list}>
          {categories.map(({ name, label, img }) => {
            const amount = products.filter(
              product => product.category === name,
            ).length;

            return (
              <li key={name} className={styles.category__item}>
                <Link to={name} className={styles.category__link}>
                  <img src={img} alt={name} className={styles.category__img} />
                </Link>

                <Link to={name} className={styles.category__link}>
                  <h4 className={styles.category__name}>{label}</h4>
                </Link>
                <p className={`${styles.category__amount} body-text`}>
                  {amount} models
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
