import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { generateSlugForProduct } from '../../helpers/utils';
import { Product } from '../../types/Product';
import { CartContext } from '../../store/SavedProductsContext';

import './CartPage.scss';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    price,
    discount,
    imageUrl,
    quantity,
    name,
    type,
    id,
  } = product;

  const priceAfterDiscount = price * ((100 - discount) / 100);
  const { changeCartItems } = useContext(CartContext);
  const slug = generateSlugForProduct({ type, id });

  const handleDeleteItem = () => {
    changeCartItems(product);
  };

  const handleQuantityChange = (action: string) => () => {
    switch (action) {
      case 'remove':
        changeCartItems({
          ...product,
          quantity: quantity && quantity - 1,
        });
        break;

      case 'add':
        changeCartItems({
          ...product,
          quantity: quantity && quantity + 1,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="CartItem">
      <div className="CartItem__section">
        <button
          type="button"
          data-cy="cartDeleteButton"
          className="CartItem__remove-button"
          onClick={handleDeleteItem}
        >
          {' '}
        </button>
        <Link
          to={slug}
          className="CartItem__product-img"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <Link
          to={slug}
          className="CartItem__product-name"
        >
          {name}
        </Link>
      </div>
      <div className="CartItem__section">
        <div className="CartItem__quantity-section">
          <button
            type="button"
            className="
              CartItem__quantity-button
              CartItem__quantity-button--remove
            "
            onClick={handleQuantityChange('remove')}
            disabled={!quantity || quantity <= 1}
          >
            {' '}
          </button>
          <div className="CartItem__quantity" data-cy="productQauntity">
            {quantity}
          </div>
          <button
            type="button"
            className="
              CartItem__quantity-button
              CartItem__quantity-button--add
            "
            onClick={handleQuantityChange('add')}
          >
            {' '}
          </button>
        </div>
        <span className="CartItem__price">
          {String.fromCodePoint(0x00024)}
          {priceAfterDiscount * (quantity || 1)}
        </span>
      </div>
    </div>
  );
};
