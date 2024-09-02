import './BucketCard.scss';
import { BucketItem, ProductsContext } from '../../../../../PageContext';
import { useContext } from 'react';

type Props = {
  item: BucketItem;
};

export const BucketCard: React.FC<Props> = ({ item }) => {
  const { addCountOfProduct, minusCountOfProduct, deleteBucketItem } =
    useContext(ProductsContext);

  function handleMinusItem() {
    minusCountOfProduct(item);
  }

  function handlePlusItem() {
    addCountOfProduct(item);
  }

  function handleDeleteItem() {
    deleteBucketItem(item);
  }

  return (
    <div className="bucket-card">
      <div className="up-content">
        <button className="close-img-btn" onClick={handleDeleteItem}>
          <img src="./uploadedImg/close.svg" className="close-img"></img>
        </button>
        <img src={item.item.images[0]} className="card-img"></img>
        <p className="card-p">{item.item.name}</p>
      </div>
      <div className="down-content">
        <div className="card-btns">
          <button className="card-btn" onClick={handleMinusItem}>
            <img src="./uploadedImg/Minus.svg" className="card-btn-img"></img>
          </button>
          <div className="card-number">{item.count}</div>
          <button className="card-btn" onClick={handlePlusItem}>
            <img src="./uploadedImg/Plus.svg" className="card-btn-img"></img>
          </button>
        </div>
        <p className="card-price">{`$${item.item.priceDiscount * item.count}`}</p>
      </div>
    </div>
  );
};
