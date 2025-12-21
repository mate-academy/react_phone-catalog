import { useNavigate } from 'react-router-dom';
import { CartItem, useCart } from '../../../../contexts/CartContext';
import styles from './CartProduct.module.scss';
import removeBtn from '/icons/close-icon.png';
import plusIcon from '/icons/plus-icon.png';
import minusIcon from '/icons/minus-active-icon.png';
import minusIconDisabled from '/icons/minus-icon.png';

type Props = {
  item: CartItem;
};

export const CartProduct: React.FC<Props> = ({ item }) => {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const normalizeForUrlPart = (str: string) =>
    str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[()]/g, '');

  const handleClickProduct = () => {
    const productId = `${normalizeForUrlPart(item.product.itemId)}-${normalizeForUrlPart(item.product.capacity)}-${normalizeForUrlPart(item.product.color)}`;

    navigate(`/${item.product.category}/${productId}`, {
      state: {
        category: item.product.category,
        name: item.product.name,
        showDiscount: item.product.price,
        color: item.product.color,
        capacity: item.product.capacity,
      },
    });
  };

  const imgUrl =
    'https://annaabramovaa.github.io/react_phone-catalog/' + item.product.image;

  return (
    <div className={styles.cart_product}>
      <button
        className={styles.cart_product_remove_btn}
        onClick={() => removeFromCart(item.cartItemId)}
      >
        <img src={removeBtn} alt="remove" />
      </button>

      <div className={styles.cart_product_left} onClick={handleClickProduct}>
        <img
          src={imgUrl}
          alt={item.product.name}
          className={styles.cart_product_img}
        />
        <p className={styles.cart_product_item_name}>{item.product.name}</p>
      </div>

      <div className={styles.cart_product_right}>
        <div className={styles.cart_product_quantity}>
          <button
            className={styles.cart_product_decrease_btn}
            onClick={() => decreaseQty(item.cartItemId)}
            disabled={item.quantity === 1}
          >
            <img
              src={item.quantity === 1 ? minusIconDisabled : minusIcon}
              alt="minus"
            />
          </button>
          <p className={styles.cart_product_qty}>{item.quantity}</p>
          <button
            className={styles.cart_product_increase_btn}
            onClick={() => increaseQty(item.cartItemId)}
          >
            <img src={plusIcon} alt="plus" />
          </button>
        </div>
        <div className={styles.cart_product_price}>${item.product.price}</div>
      </div>
    </div>
  );
};
