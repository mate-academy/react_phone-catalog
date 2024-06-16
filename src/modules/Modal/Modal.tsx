import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks/hooks';
import { clearCart } from '../../features/cart/cartSlise';
import { useNavigate } from 'react-router-dom';
type Props = {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Modal: React.FC<Props> = ({ title, isOpen, setIsOpen }) => {
  const popupClasses = classNames(styles.popup, {
    [styles.popup__open]: isOpen,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        navigate('/', { replace: true });
        setIsOpen(false);
        dispatch(clearCart());
      }
    }

    return undefined;
  }, [countdown, dispatch, navigate, setIsOpen]);

  const handleClosePopup = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body_lock');
    } else {
      document.body.classList.remove('body_lock');
    }

    return () => {
      document.body.classList.remove('body_lock');
    };
  }, [isOpen]);

  const handleClearCart = () => {
    setCountdown(3);
  };

  return (
    <div className={popupClasses}>
      <div className={styles.popup__area} onClick={handleClosePopup}></div>
      <div className={styles.popup__body}>
        <div className={styles.popup__content}>
          {countdown ? (
            <div>
              <h2>Thanks for purchasing!</h2>
              <p>
                You will be redirected to the homepage in {countdown} seconds.
              </p>
            </div>
          ) : (
            <h2 className={styles.popup__text}>{title}</h2>
          )}
          <div />
          {!countdown && (
            <div className={styles.popup__buttons}>
              <button
                className={styles.popup__button}
                onClick={handleClosePopup}
              >
                Close popup
              </button>
              <button
                className={styles.popup__button}
                onClick={handleClearCart}
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
