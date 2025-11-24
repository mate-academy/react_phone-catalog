import { Products } from 'src/types/products';
import style from './Cart.module.scss';
import { Device } from 'src/types/Device';
import { useContext } from 'react';
import { ShoppingContex } from '../../../context/ShoppingContex';

type Props = {
  item: Device | Products;
};

const Cart: React.FC<Props> = ({ item }) => {
  const { increaseToCart, decreaseFromCart, deleteItems } =
    useContext(ShoppingContex);

  let imageUrls: string;
  let price: number;

  if ('images' in item && 'priceDiscount' in item) {
    imageUrls = item.images[0];
    price = item.priceDiscount;
  } else {
    imageUrls = item.image;
    price = item.price;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.top}>
        <div className={style.deleteItem}>
          <button
            onClick={() => deleteItems(item)}
            className={style.deleteItem__button}
          ></button>
        </div>
        <div className={style.img}>
          <img src={imageUrls} alt="" />
        </div>
        <h3 className={style.title}>{item.name}</h3>
      </div>
      <div className={style.bottom}>
        <div className={style.bottom__button}>
          <div className={`${style.decrease} ${style.box__button}`}>
            <button
              onClick={() => decreaseFromCart(item)}
              className={`${style.button}  ${style.decrease__button}`}
            ></button>
          </div>
          <span className={style.quantity}>{item.quantity}</span>
          <div className={`${style.increase} ${style.box__button}`}>
            <button
              onClick={() => increaseToCart(item)}
              className={`${style.button} ${style.increase__button}`}
            ></button>
          </div>
        </div>
        <span className={style.price}>${price}</span>
      </div>
    </div>
  );
};

export default Cart;
