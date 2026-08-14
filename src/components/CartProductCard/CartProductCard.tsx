import { useContext } from 'react';
import { Product } from '../../types/Product';
import {
  DispatchContext,
  StatesContext,
} from '../../base/store/GlobalStateProvider';
import { Icon } from '../../base/Icon/Icon';
import './CartProductCard.scss';

type Props = {
  product: Product;
};

export const CartProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useContext(DispatchContext);
  const { cart } = useContext(StatesContext);

  const handleDeleteClick = () => {
    dispatch({
      type: 'updateCart',
      payload: cart.filter(p => p.id !== product.id),
    });
  };

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

  const price = product.price || 0;
  const totalPrice = price * (product.quantity || 1);

  // O caminho já vem completo do JSON, só adicione a barra inicial
  const imagePath = product.images?.[0]
    ? `/${product.images[0]}`
    : '/img/product-not-found.png';

  return (
    <div className="cartCard">
      <div className="cartCard__container">
        <Icon
          iconType="close"
          iconUse="button"
          iconSize="16"
          onClick={handleDeleteClick}
        />
        <img
          src={imagePath}
          className="cartCard__image"
          alt={product.name}
          onError={event => {
            const img = event.currentTarget;

            img.src = '/img/product-not-found.png';
          }}
        />
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
        <h3 className="cartCard__price">${totalPrice}</h3>
      </div>
    </div>
  );
};
