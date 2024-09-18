import { useContext } from 'react';
import { Icon } from '../base/Icon/Icon.component';
import { DispatchContext } from '../../store/GlobalStateProvider';
import { ProductSummary } from '../../types/ProductSummary';

type Props = {
  product: ProductSummary;
};

export const CartProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useContext(DispatchContext);

  const handleMinusClick = () => {
    if (!product.quantity || product.quantity <= 1) {
      return;
    }

    dispatch({ type: 'decreaseQuantity', payload: product.id });
  };

  const handlePlusClick = () => {
    if (!product.quantity) {
      return;
    }

    dispatch({ type: 'increaseQuantity', payload: product.id });
  };

  return (
    <div className="cartCard">
      <div className="cartCard__container">
        <Icon iconType="close" iconUse="button" iconSize="16" />
        <img src={product.image} className="cartCard__image" />
        <div className="cartCard__product-name">{product.name}</div>
      </div>
      <div className="cartCard__counterAndPrice">
        <div className="cartCard__counter">
          <Icon
            iconType="minus"
            iconUse="button"
            iconSize="32"
            border
            onClick={handleMinusClick}
            disabled={product.quantity === 1}
          />
          <span className="cartCard__counter-number">{product.quantity}</span>
          <Icon
            iconType="plus"
            iconUse="button"
            iconSize="32"
            border
            onClick={handlePlusClick}
          />
        </div>
        <h3 className="cardCard__price">
          {product.quantity && `$${product.price * product.quantity}`}
        </h3>
      </div>
    </div>
  );
};
