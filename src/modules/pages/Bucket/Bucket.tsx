import './Bucket.scss';
import { BucketCard } from './Components/BucketCard';
import { useProductsContext } from '../../../PageContext';

export const Bucket: React.FC = () => {
  const { items } = useProductsContext();

  console.log(items);

  return (
    <div className="bucket-layout">
      <h1 className="bucket-h1">Card</h1>
      <div className="products-block">
        <div className="cards-layout">
          {items.map(item => (
            <BucketCard item={item} key={item.id} />
          ))}
        </div>
        <div className="bucket-checkout">
          <h1 className="checkout-h1">$2657</h1>
          <p className="checkout-p">Total for 3 items</p>
          <div className="checkout-btn-block">
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
