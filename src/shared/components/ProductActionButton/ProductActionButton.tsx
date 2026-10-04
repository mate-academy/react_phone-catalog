import styles from './ProductActionButton.module.scss';

type Props = {
  text: string;
  onClick: () => void;
  className?: string;
};

export const ProductActionButton: React.FC<Props> = ({
  text,
  onClick,
  className,
}) => {
  {
    return (
      <button
        className={`${styles.button} ${className || ''}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
};
