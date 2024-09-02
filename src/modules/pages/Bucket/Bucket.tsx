import './Bucket.scss';
import { BucketCard } from './Components/BucketCard';
import { useProductsContext } from '../../../PageContext';
import { Model } from './Components/Model';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Bucket = () => {
  const { bucketItems, clearTheBucket } = useProductsContext();

  const total = bucketItems.reduce((acc, { count, item }) => {
    return acc + count * item.priceDiscount;
  }, 0);

  const totalCount = bucketItems.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  const [openModal, setOpenModel] = useState(false);

  function clearItems() {
    clearTheBucket();
    setOpenModel(false);
  }

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bucket-layout">
      <div className="bucket-link-block">
        <button className="bucket-link-btn" onClick={() => navigate(-1)}>
          <img src="./uploadedImg/right-black.svg" className="close-img"></img>
          <p className="bucket-link-p">Back</p>
        </button>
      </div>
      <h1 className="bucket-h1">Cart</h1>
      <div className="products-block">
        <div className="cards-layout">
          {bucketItems.length > 0 ? (
            bucketItems.map(product => (
              <BucketCard item={product} key={product.item.id} />
            ))
          ) : (
            <div className="bucket-is-empty">Your cart is empty</div>
          )}
        </div>
        <div className="bucket-checkout">
          <h1 className="checkout-h1">{`$${total}`}</h1>
          <p className="checkout-p">{`Total for ${totalCount} items`}</p>
          <div className="checkout-btn-block">
            <button className="checkout-btn" onClick={() => setOpenModel(true)}>
              Checkout
            </button>
          </div>
          <Model open={openModal}>
            <h1 className="model-h1">
              Checkout is not implemented yet. Do you want to clear the Cart?
            </h1>
            <div className="model-btns">
              <button className="checkout-btn" onClick={clearItems}>
                Confirm
              </button>
              <button
                className="checkout-btn"
                onClick={() => setOpenModel(false)}
              >
                Cancel
              </button>
            </div>
          </Model>
        </div>
      </div>
    </div>
  );
};
