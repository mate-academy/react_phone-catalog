import { Button } from '../../UI';
import style from './CardItem.module.scss';
import minus from '../../assets/icons/Minus.svg';
import plus from '../../assets/icons/Plus.svg';
import closeIcon from '../../assets/icons/Close.svg';
import { useState } from 'react';

const product = {
  id: 194,
  category: 'phones',
  itemId: 'apple-iphone-14-pro-1tb-gold',
  name: 'Apple iPhone 14 Pro 1TB Gold',
  fullPrice: 1740,
  price: 1520,
  screen: "6.1' OLED",
  capacity: '1TB',
  color: 'gold',
  ram: '6GB',
  year: 2022,
  image: 'img/phones/apple-iphone-14-pro/gold/00.webp',
};

export const CardItem = () => {
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
        <div className={style.cardItem__product__delete}>
          <img src={closeIcon} alt="icon" />
        </div>
        <img className={style.cardItem__product__image} src={product.image} />
        <h2 className={style.cardItem__product__title}>{product.name}</h2>
      </div>
      <section className={style.cardItem__info}>
        <div className={style.cardItem__info__pickAmount}>
          <Button
            type="number"
            size={{ height: 32 }}
            onClick={decreaseProductAmount}
          >
            <img src={minus} alt="icon" />
          </Button>
          <div className={style.cardItem__info__pickAmount__amount}>
            {productAmount}
          </div>
          <Button
            type="number"
            size={{ height: 32 }}
            onClick={increaseProductAmount}
          >
            <img src={plus} alt="icon" />
          </Button>
        </div>
        <span
          className={style.cardItem__info__price}
        >{`$${product.price}`}</span>
      </section>
    </article>
  );
};
