import styles from './ItemDescription.module.scss';
import type { ProductDetails } from '../../../../types/ProductDetails';

interface ItemDescriptionProps {
  product: ProductDetails;
}

export const ItemDescription = ({ product }: ItemDescriptionProps) => {
  return (
    <div className={styles.description}>
      <h2>About</h2>

      {product.description.map(block => (
        <div key={block.title} className={styles.block}>
          <h3>{block.title}</h3>
          {block.text.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
};
