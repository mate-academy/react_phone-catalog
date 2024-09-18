import { ProductSummary } from '../../types/ProductSummary';
import { Icon } from '../base/Icon/Icon.component';

type Props = {
  product: ProductSummary;
};

export const CartProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="cartCard">
      <div className="cartCard__container">
        <Icon iconType="close" iconUse="button" iconSize="16" />
        <img src={product.image} className="cartCard__image" />
        <div className="cartCard__product-name">{product.name}</div>
      </div>
      <div className="cartCard__counterAndPrice">
        <div className="cartCard__counter">
          <Icon iconType="minus" iconUse="button" iconSize="32" border />
          <span className="cartCard__counter-number">1</span>
          <Icon iconType="plus" iconUse="button" iconSize="32" border />
        </div>
        <h3 className="cardCard__price">{`$${product.price}`}</h3>
      </div>
    </div>
  );
};
