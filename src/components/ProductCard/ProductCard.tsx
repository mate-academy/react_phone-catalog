import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { srollToTop } from '../../utils/scrollToTop';
import { CardButtons } from './ProductCardParts/CardButtons';
import { PricePart } from './ProductCardParts/PricePart';
import { SpecsPart } from './ProductCardParts/SpecsPart';

type Props = {
  product: Product
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="card is-shadowless productCard pt-5">
      <Link
        to={`/${product.type}s/${product.id}`}
        onClick={srollToTop}
      >
        <div className="card-image is-flex is-justify-content-center">
          <figure className="image productCard__image">
            <img src={product.imageUrl} alt="CardImg" />
          </figure>
        </div>
      </Link>
      <div className="card-content">
        <Link
          className="has-text-dark"
          to={`/${product.type}s/${product.id}`}
          onClick={srollToTop}
        >
          <div className="productCard__title mb-2">
            {product.name}
          </div>
          <PricePart product={product} />
          <hr className="mb-2 mt-0" />
          <SpecsPart product={product} />
        </Link>
        <CardButtons product={product} />
      </div>
    </div>
  );
};
