import { Accessories } from '../../types/Accessories';
import { Phones } from '../../types/Phones';
import { Tablets } from '../../types/Tablets';
import styles from './Description.module.scss';

type ProductType = Phones | Tablets | Accessories;

interface DescriptionProps {
  product: ProductType;
}

export const Description: React.FC<DescriptionProps> = ({ product }) => {
  return (
    <div className={styles.description}>
      <h3 className={styles.description_title}>About</h3>
      {product.description.map(desc => (
        <div className={styles.description_block} key={desc.title}>
          <h4 className={styles.description_block_title}>{desc.title}</h4>
          {desc.text.map((text, index) => (
            <p className={styles.description_block_text} key={index}>
              {text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
