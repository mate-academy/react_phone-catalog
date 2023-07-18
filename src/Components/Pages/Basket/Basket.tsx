import { useNavigate } from 'react-router-dom';
import './Basket.scss';
import PrevArrow from './BasketImage/PrevArrow.svg';

export const Basket = () => {
  const Ids = JSON.parse(localStorage.getItem('ids') || '[]');
  const navigation = useNavigate();

  return (
    <>
      <h1>Basket</h1>
      <div className="prev-to-back">
        <button
          type="button"
          className="prev-to-back"
          onClick={() => navigation(-1)}
        >
          <img src={PrevArrow} alt="PrevArrow" />
          <p className="block-forPageNotFound__text-1-1">Back</p>
        </button>
      </div>

      <h1 className="h1ForBasket">
        Cart
      </h1>

      <div
        className={`mainBlockForBasket ${Ids.length === 0 ? 'mainBlockForBasket-active' : ''}`}
      >
        content
      </div>
    </>
  );
};
