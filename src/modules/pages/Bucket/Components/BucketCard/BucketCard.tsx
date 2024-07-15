import { useState } from 'react';
import './BucketCard.scss';

export const BucketCard = () => {
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
      <p className="card-p">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
      <div className="card-btns">
        <button className="card-btn" onClick={handleMinusItem}>
          <img src="../uploadedImg/Minus.png" className="card-btn-img"></img>
        </button>
        <div className="card-number">{count}</div>
        <button className="card-btn" onClick={handlePlusItem}>
          <img src="../uploadedImg/Plus.png" className="card-btn-img"></img>
        </button>
      </div>
      <p className="card-price">$799</p>
    </div>
  );
};
