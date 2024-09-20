import { ProductSummary } from '../../../types/ProductSummary';
import { Link, useParams } from 'react-router-dom';
import { Price } from '../Price/Price.component';
import { SpecsMini } from '../SpecsMini/SpecsMini.component';
import { CardButtons } from '../CardButtons/CardButtons.component';

type Props = {
  product: ProductSummary;
  showDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { category } = useParams();

  return (
    <div className="card">
      <Link to={`/${category}/${product.itemId}`} className="card__link">
        <figure className="card__image-wrapper">
          <img src={product.image} className="card__image" />
        </figure>
        <div className="card__product-name">{product.name}</div>
      </Link>
      <Price product={product} showDiscount />
      <SpecsMini product={product} />
      <CardButtons product={product} />
    </div>
  );
};
