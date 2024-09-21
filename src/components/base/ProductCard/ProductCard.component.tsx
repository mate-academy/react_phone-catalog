import { ProductSummary } from '../../../types/ProductSummary';
import { Link } from 'react-router-dom';
import { Price } from '../Price/Price.component';
import { SpecsMini } from '../SpecsMini/SpecsMini.component';
import { CardButtons } from '../CardButtons/CardButtons.component';
import { Line } from '../Line/Line.component';

type Props = {
  product: ProductSummary;
  showDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  return (
    <div className="card">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="card__link"
      >
        <figure className="card__image-wrapper">
          <img src={product.image} className="card__image" />
        </figure>
        <div className="card__product-name">{product.name}</div>
      </Link>
      <Price product={product} showDiscount={showDiscount} />
      <Line />
      <SpecsMini product={product} />
      <CardButtons product={product} />
    </div>
  );
};
