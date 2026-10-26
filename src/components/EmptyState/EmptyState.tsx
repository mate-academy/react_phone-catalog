import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../ui/PrimaryButton/PrimaryButton';
import styles from './EmptyState.module.scss';
import { HTMLAttributes } from 'react';

type Props = {
  type: 'error' | 'favourites' | 'cart' | 'product';
  text?: string;
  buttonText?: string;
  onButtonClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const data = {
  error: {
    text: 'Oops! Looks like this page has gone missing',
    src: 'img/page-not-found.png',
  },

  favourites: {
    text: 'There are no items in your favourites yet',
    src: 'img/cart-is-empty.png',
  },

  cart: {
    text: 'There are no items in your cart yet',
    src: 'img/cart-is-empty.png',
  },

  product: {
    text: `Oops! We couldn't find the product you're looking for`,
    src: 'img/product-not-found.png',
  },
};

export const EmptyState = ({
  type,
  text = data[type].text,
  buttonText = 'Back to shopping',
  onButtonClick,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.emptyState}>
      <img src={data[type].src} className={styles.image} />
      <h2 className={styles.title}>{text}</h2>

      <PrimaryButton onClick={onButtonClick ?? (() => navigate('/'))}>
        {buttonText}
      </PrimaryButton>
    </div>
  );
};
