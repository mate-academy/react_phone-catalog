import styles from './AddToCart.module.scss';

type Props = {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AddToCart: React.FC<Props> = ({ onClick, isActive }) => (
  <button
    className={`
      buttonText 
      ${styles.button} 
      ${isActive ? styles.isSelected : ''}
    `}
    onClick={onClick}
  >
    {isActive ? 'Added to cart' : 'Add to cart'}
  </button>
);
