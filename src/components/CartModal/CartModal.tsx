import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardButton } from '../ui/CardButton';
import styles from './CartModal.module.scss';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

type CartModalProps = {
  onClose: () => void;
  onClear: () => void;
};

export const CartModal: React.FC<CartModalProps> = ({ onClose, onClear }) => {
  return (
    <div className={styles['cart-modal']}>
      <div className={styles['cart-modal__overlay']} onClick={onClose}>
        <div
          className={styles['cart-modal__container']}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className={styles['cart-modal__content']}>
            <h5 style={{ textAlign: 'center' }}>
              {' '}
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ color: 'orange' }}
              />{' '}
              Checkout is not implemented.
            </h5>
            <p className="body-text">Do you want to clear the Cart?</p>
          </div>
          <div className={styles['cart-modal__buttons']}>
            <CardButton
              style={{ width: 'fit-content', paddingInline: '4px' }}
              variant="control"
              onClick={onClear}
            >
              Clear the Cart
            </CardButton>
            <CardButton
              style={{ width: 'fit-content', paddingInline: '4px' }}
              variant="control"
              onClick={onClose}
            >
              Cancel
            </CardButton>
          </div>
        </div>
      </div>
    </div>
  );
};
