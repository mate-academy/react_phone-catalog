import { Products } from '../../../../types/Products';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../../utils/scroolTop';
import { AddSelection } from '../../../components/AddSelection/AddSelection';

interface Props {
  products: Products;
}

export const ProductCard: React.FC<Props> = ({ products }) => {
  const {
    category,
    itemId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  } = products;

  const properties = [
    { key: 'Screen', label: screen },
    { key: 'Capacity', label: capacity },
    { key: 'RAM', label: ram },
  ];

  const path = `/${category}/${itemId}`;

  return (
    <div className={styles['product-card']}>
      <Link
        to={path}
        className={styles['product-card__image']}
        onClick={scrollToTop}
      >
        <img
          src={image}
          alt={name}
          className={styles['product-card__image--phone']}
        />
      </Link>

      <div className={styles['product-card__wrapp']}>
        <Link
          to={path}
          className={styles['product-card__link']}
          onClick={scrollToTop}
        >
          <h3 className={styles['product-card__title']}>{name}</h3>
        </Link>
      </div>

      <div className={styles['product-card__price']}>
        <p className={styles['product-card__price--original']}>${price}</p>
        <p className={styles['product-card__price--dicounted']}>${fullPrice}</p>
      </div>

      <ul className={styles['product-card__list']}>
        {properties.map(property => (
          <li key={property.key} className={styles['product-card__item']}>
            <div className={styles['product-card__details']}>
              <p className={styles['product-card__key']}>{property.key}</p>
              <p className={styles['product-card__label']}>{property.label}</p>
            </div>
          </li>
        ))}
      </ul>

      <AddSelection product={products} />
    </div>
  );
};
