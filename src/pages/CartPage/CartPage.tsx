import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../images/arrow-left-black.svg';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="cart-container">
        <button
          type="button"
          className="left-back"
          onClick={() => navigate(-1)}
          data-cy="backButton"
        >
          <img src={arrowLeft} alt="arrow_right" />
          <p>Back</p>
        </button>
        <h1>Cart</h1>
      </div>
    </>
  );
};
