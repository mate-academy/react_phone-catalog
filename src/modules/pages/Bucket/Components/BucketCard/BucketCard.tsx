import { useState } from 'react';
import './BucketCard.scss';
import { Access, Phone } from '../../../types/types';

type Props = {
  item: Phone | Access;
};

export const BucketCard: React.FC<Props> = ({ item }) => {
  const [count, setCount] = useState(1);

  function handleMinusItem() {
    setCount(currentCount => {
      if (currentCount === 0) {
        return 0;
      }

      return currentCount - 1;
    });
  }

  function handlePlusItem() {
    setCount(currentItem => {
      return currentItem + 1;
    });
  }

  return (
    <div className="bucket-card">
      <button className="close-img-btn">
        <img src="../uploadedImg/Close.png" className="close-img"></img>
      </button>
      <img
        src="img/phones/apple-iphone-11/black/00.webp"
        className="card-img"
      ></img>
      <p className="card-p">{item.name}</p>
      <div className="card-btns">
        <button className="card-btn" onClick={handleMinusItem}>
          <img src="../uploadedImg/Minus.png" className="card-btn-img"></img>
        </button>
        <div className="card-number">{count}</div>
        <button className="card-btn" onClick={handlePlusItem}>
          <img src="../uploadedImg/Plus.png" className="card-btn-img"></img>
        </button>
      </div>
      <p className="card-price">{item.priceDiscount}</p>
    </div>
  );
};
