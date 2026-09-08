import styles from './ProductCard.module.scss';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { Actions } from '../Actions';
import { scrollToTop } from '../../utils/utility';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const properties = [
    { term: 'Screen', desc: screen },
    { term: 'Capacity', desc: capacity },
    { term: 'RAM', desc: ram },
  ];

  const pathLink = `/${category}/${itemId}`;

  return (
    <div className={cn(styles['product-card'])}>
      <Link
        to={pathLink}
        className={cn(styles['product-card__photo-link'])}
        onClick={scrollToTop}
      >
        <img
          className={cn(styles['product-card__photo'])}
          src={image}
          alt={name}
        />
      </Link>

      <div className={styles['product-card__wrapper']}>
        <Link
          className={cn(styles['product-card__link'])}
          to={pathLink}
          onClick={scrollToTop}
        >
          <h3 className={cn(styles['product-card__title'])}>{name}</h3>
        </Link>

        <div className={styles['product-card__price-wrapper']}>
          <p className={cn(styles['product-card__price'])}>${price}</p>
          <p className={cn(styles['product-card__full-price'])}>${fullPrice}</p>
        </div>

        <ul className={cn(styles['product-card__properties-list'])}>
          {properties.map(property => (
            <li key={property.term}>
              <dl className={cn(styles['product-card__definition-list'])}>
                <dt className={cn(styles['product-card__definition-term'])}>
                  {property.term}
                </dt>
                <dd className={cn(styles['product-card__definition-desc'])}>
                  {property.desc}
                </dd>
              </dl>
            </li>
          ))}
        </ul>

        <Actions product={product} />
      </div>
    </div>
  );
};
