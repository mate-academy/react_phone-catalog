import Button from '../Button/Button';
import styles from './BrandNewModels.module.css';

export interface BrandNewModelsProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  'data-testid'?: string;
  onButtonClick?: () => void;
}

export const BrandNewModels: React.FC<BrandNewModelsProps> = ({
  children,
  className = '',
  title,
  level,
  'data-testid': dataTestId = 'Brand-title',
  onButtonClick,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div
      className={`${styles.container} ${className}`.trim()}
      role="region"
      aria-label="Brand New Models"
    >
      {children}

      <div className={styles.containerButton} aria-label="Button">
        <Button
          onClick={onButtonClick}
          className={styles.addButton}
          data-testid="add-button"
        >
          Add to cart
        </Button>
        <img
          onClick={onButtonClick}
          className={styles.addFavourites}
          aria-label="Add Favourites"
          data-testid="add-favourites"
        ></img>
      </div>

      <Tag className={styles.title} data-testid={dataTestId}>
        {title}
      </Tag>
    </div>
  );
};
