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
    <div>
      <Link to={path} onClick={scrollToTop} state={{ from: location.pathname }}>
        <img src={image} alt={name} className={style.img} />
      </Link>

      <div>
        <Link to={path} onClick={scrollToTop}>
          <h3>{name}</h3>
        </Link>
      </div>

      <div>
        <p>${price}</p>
        <p>${fullPrice}</p>
      </div>

      <ul>
        {properties.map(property => (
          <li key={property.key}>
            <div>
              <p>{property.key}</p>
              <p>{property.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
