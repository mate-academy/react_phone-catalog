import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { MainProductDetails } from '../MainProductDetails';
import { goTop } from '../../helpers/goTop';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const characteristicsArr = [
    { name: 'Screen', value: product.screen },
    { name: 'Capacity', value: product.capacity },
    { name: 'RAM', value: product.ram },
  ];

  const location = useLocation();

  return (
    <div
      className="product-card"
    >
      <Link
        to={location.pathname === '/' ? `phones/${product.phoneId}` : `${product.phoneId}`}
        className="product-card__picture"
        onClick={goTop}
      >
        <img
          className="product-card__img"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <Link
        to={`${product.phoneId}`}
        className="product-card__title"
        onClick={goTop}
      >
        {product.name}
      </Link>

      <MainProductDetails
        product={product}
        characteristicsArr={characteristicsArr}
        detailsOrder={['price', 'characteristics', 'buttons']}
      />

    </div>
  );
};
