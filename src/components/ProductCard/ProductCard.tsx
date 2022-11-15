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
      <div className="card-image is-flex is-justify-content-center">
        <Link
          to={`/${product.type}s/${product.id}`}
          onClick={srollToTop}
        >
          <figure className="image productCard__image">
            <img src={product.imageUrl} alt="CardImg" />
          </figure>
        </Link>
      </div>
      <div className="card-content">
        <div className="productCard__title mb-2">
          <Link
            className="has-text-dark"
            to={`/${product.type}s/${product.id}`}
            onClick={srollToTop}
          >
            {product.name}
          </Link>
        </div>
        <PricePart product={product} />
        <hr className="mb-2 mt-0" />
        <SpecsPart product={product} />
        <CardButtons product={product} />
      </div>
    </div>
  );
};
