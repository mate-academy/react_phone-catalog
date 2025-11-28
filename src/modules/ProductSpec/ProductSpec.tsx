import { ProductDetails } from '../../types/ProductDetails';
import styles from './ProductSpec.module.scss';
// import { useParams } from 'react-router-dom';

type Props = {
  product: ProductDetails;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onColorChange: (color: string) => void;
};

export const ProductSpec: React.FC<Props> = ({
  product,
  activeIndex,
  setActiveIndex,
  onColorChange,
}) => {
  // const { productId } = useParams();

  return (
    <div className={styles.spec}>
      <div className={styles.spec_colors}>
        <p className={styles.spec_colors_title}>Available colors</p>
        <div className={styles.spec_colors_container}>
          {product.colorsAvailable.map((color, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                className={`${styles.spec_color} ${isActive ? styles['spec_color--active'] : ''}`}
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  onColorChange(color);
                }}
              >
                <p
                  className={styles.spec_item_color}
                  style={{ backgroundColor: color }}
                ></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
