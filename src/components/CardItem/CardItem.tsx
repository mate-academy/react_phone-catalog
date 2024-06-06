import { Button } from '../../UI';
import style from './CardItem.module.scss';
import minus from '../../assets/icons/Minus.svg';
import plus from '../../assets/icons/Plus.svg';
import closeIcon from '../../assets/icons/Close.svg';
import { useState } from 'react';
/* import { Product } from '../../pages/Cart/type/ProductType'; */

/*type Props = {
  product: Product;
  onDeleteClick: (prdouctId: number) => void;
};*/

const product = {
  id: 191,
  category: 'phones',
  itemId: 'apple-iphone-14-pro-128gb-gold',
  name: 'Apple iPhone 14 Pro 128GB Gold',
  fullPrice: 1156,
  price: 1068,
  screen: "6.1' OLED",
  capacity: '128GB',
  color: 'gold',
  ram: '6GB',
  year: 2022,
  image: 'img/phones/apple-iphone-14-pro/gold/00.webp',
};

export const CardItem: React.FC /*<Props>*/ =
  (/*{ product, onDeleteClick }*/) => {
    const [productAmount, setProductAmount] = useState<number>(1);
    const increaseProductAmount = () => {
      setProductAmount(prev => prev + 1);
    };

    const decreaseProductAmount = () => {
      if (productAmount > 1) {
        setProductAmount(prev => prev - 1);
      }
    };

    return (
      <article className={style.cardItem}>
        <div className={style.cardItem__product}>
          <div
            className={style.cardItem__delete}
            onClick={/*() => onDeleteClick(product.id)*/ () => {}}
          >
            <img src={closeIcon} alt="icon" />
          </div>
          <img className={style.cardItem__image} src={product.image} />
          <h2 className={style.cardItem__title}>{product.name}</h2>
        </div>
        <section className={style.cardItem__info}>
          <div className={style.cardItem__pickAmount}>
            <Button
              type="number"
              size={{ height: 32 }}
              onClick={decreaseProductAmount}
            >
              <img src={minus} alt="icon" />
            </Button>
            <div className={style.cardItem__amount}>{productAmount}</div>
            <Button
              type="number"
              size={{ height: 32 }}
              onClick={increaseProductAmount}
            >
              <img src={plus} alt="icon" />
            </Button>
          </div>
          <span className={style.cardItem__price}>{`$${product.price}`}</span>
        </section>
      </article>
    );
  };
