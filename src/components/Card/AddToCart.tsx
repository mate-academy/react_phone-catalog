import styles from './AddToCart.module.scss';

type Props = {
  isActive: boolean;
  onClick: () => void;
}

export const AddToCart: React.FC<Props> = ({ onClick, isActive }) => (
  <button
    className={`
      buttonText 
      ${styles.button} 
      ${isActive ? styles.isSelected : ''}
    `}
    onClick={onClick}
  >
    {isActive ? 'Added' : 'Add to cart'}
  </button>
)