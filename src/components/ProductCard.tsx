import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import ProductButtons from './ProductButtons';
import TechSpecs from './TechSpecs';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const techList = [
    { name: 'Screen', spec: product.screen },
    { name: 'Capacity', spec: product.capacity },
    { name: 'RAM', spec: product.ram },
  ];

  return (
    <div className="card">
      <Link
        to={`/${product.type}s/${product.id}`}
        className="card__img-container"
      >
        <img
          src={`${product.imageUrl}`}
          alt="img-product"
          className="card__img"
        />
      </Link>
      <h3 className="card__name">
        {product.name}
      </h3>
      <p className="card__price">
        <span
          className="card__price--discount"
        >
          {`$${product.newPrice}`}
        </span>
        {product.discount > 0 && <span className="card__price--oldPrice">{`$${product.price}`}</span>}
      </p>
      <TechSpecs list={techList} />
      <ProductButtons id={product.id} />
    </div>
  );
};

export default ProductCard;
