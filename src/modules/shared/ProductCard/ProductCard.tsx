import './ProductCard.scss';
import { Product } from '../../../types/Product';
import { Link } from 'react-router-dom';
import { AddButtons } from '../AddButtons';
import { CardItems } from '../CardItems/CardItems';
type Props = {
  product: Product;
  isDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isDiscount }) => {
  const {
    image,
    name,
    fullPrice,
    screen,
    capacity,
    ram,
    price,
    itemID,
    category,
  } = product;

  return (
    <div className="product-card">
      <Link to={`/${category}/${itemID}`}>
        <img src={image} alt="mobile" className="product-card__image" />
        <h4 className="product-card__title"> {name} </h4>
      </Link>
      <p className="product-card__price">
        {`$${price}`}
        {isDiscount && (
          <span className="product-card__discount">{`$${fullPrice}`}</span>
        )}
      </p>
      <CardItems screen={screen} capacity={capacity} ram={ram} />
      <AddButtons product={product} />
    </div>
  );
};
