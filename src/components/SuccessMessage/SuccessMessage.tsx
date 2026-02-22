import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import styles from './SuccessMessage.module.scss';
import { RoutesLink } from '../../types/routes';
import checkCircle from '../../../public/animations/success-message.json';
import { useAppDispatch } from '../../hooks/helperToolkit';
import { clearCart } from '../../slices/cartSlice';

export const SuccessMessage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(clearCart());
    navigate(RoutesLink.HomePage);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.animation}>
          <Lottie
            animationData={checkCircle}
            className={styles.checkAnimation}
          />
        </div>
        <h2 className={styles.title}>Your order is confirmed!</h2>
        <p className={styles.description}>
          Your order has been successfully processed.
        </p>
        <button onClick={handleButtonClick} className={styles.button}>
          Continue shopping
        </button>
      </div>
    </div>
  );
};
