import { Products } from '../../../types/Products';
import { Link, useLocation } from 'react-router-dom';
import style from './ProductCard.module.scss';

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const properties = [
    { key: 'Screen', label: screen },
    { key: 'Capacity', label: capacity },
    { key: 'RAM', label: ram },
  ];

  const path = `/${category}/${itemId}`;
  const location = useLocation();

  return (
    <div className={style['product-card']}>
      <Link
        to={path}
        onClick={scrollToTop}
        state={{ from: location.pathname }}
        className={style['product-card__image']}
      >
        <img
          src={image}
          alt={name}
          className={style['product-card__image--phone']}
        />
      </Link>

      <div className={style['product-card__wrapp']}>
        <Link
          to={path}
          onClick={scrollToTop}
          className={style['product-card__link']}
        >
          <h3 className={style['product-card__title']}>{name}</h3>
        </Link>
      </div>

      <div className={style['product-card__price']}>
        <p className={style['product-card__price--original']}>${price}</p>
        <p className={style['product-card__price--dicounted']}>${fullPrice}</p>
      </div>

      <ul className={style['product-card__list']}>
        {properties.map(property => (
          <li key={property.key} className={style['product-card__item']}>
            <div className={style['product-card__details']}>
              <p className={style['product-card__key']}>{property.key}</p>
              <p className={style['product-card__label']}>{property.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
