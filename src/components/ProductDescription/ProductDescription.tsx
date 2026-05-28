import { TypesOfProducts } from '../../types/TypesOfProducts';
import styles from './ProductDescription.module.scss';

type Props = {
  currentProduct: TypesOfProducts;
};

export const ProductDescription: React.FC<Props> = ({ currentProduct }) => (
  <>
    <div className={styles.titleContainer}>
      <h3 className={styles.title}>About</h3>
    </div>

    <div className={styles.descroptionsContainer}>
      {currentProduct.description.map(item => {
        return (
          <div className={styles.description} key={item.title}>
            <h4 className={styles.itemTitle}>{item.title}</h4>
            {item.text.map((paragraph, i) => {
              return (
                <p className={styles.paragraph} key={i}>
                  {paragraph}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  </>
);

export default ProductDescription;
