import styles from './PrimaryButton.module.scss';
import cn from 'classnames';

interface Props {
  action?: () => void;
  text: string;
  height: '40' | '48';
  isSelected: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
  action = () => {},
  text,
  height,
  isSelected,
}) => {
  return (
    <button
      onClick={action}
      className={cn(styles.primary__button, {
        [styles['primary__button-disabled']]: isSelected,
      })}
      style={{
        height: `${height}px`,
      }}
      disabled={isSelected}
    >
      {isSelected ? 'Added to cart' : text}
    </button>
  );
};
