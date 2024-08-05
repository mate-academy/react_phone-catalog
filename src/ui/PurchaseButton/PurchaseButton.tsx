import cn from 'classnames';
import styles from './PurchaseButton.module.scss';

type Props = {
  children: React.ReactNode;
  size?: string;
  handleClick?: () => void;
};

export const PurchaseButton: React.FC<Props> = ({
  children,
  handleClick = () => {},
  size,
}) => {
  return (
    <button
      onClick={handleClick}
      className={cn(styles.PurchaseButton, {
        [styles.Large]: size === 'large',
      })}
    >
      {children}
    </button>
  );
};
