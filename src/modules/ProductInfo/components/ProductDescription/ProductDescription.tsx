import { DividingLine } from '../../../../components/DividingLine';
import { ProductsInfo } from '../../../../shared/types/ProductsInfo';
import styles from './ProductDescription.module.scss';

type ProductDescriptionProps = {
  product: ProductsInfo | null;
};

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
}) => {
  return (
    <div className={styles.productDescription}>
      <div className={styles.description__About}>
        <h2 className={styles.description__title}>About</h2>
        <DividingLine />
        {product.description.map((item, index) => (
          <div key={index} className={styles.About__items}>
            <h3 className={styles.About__items_title}>{item.title}</h3>
            <div className={styles.About__items_description}>
              {item.text.map((text, textIndex) => (
                <p key={textIndex}>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.description__TechSpecs}>
        <h2 className={styles.description__title}>Tech specs</h2>
        <DividingLine />

        <div className={styles.techSpecs}>
          <ul className={styles.techSpecs__list}>
            <li className={styles.techSpecs__item}>
              <span className={styles.item__label}>Screen</span>
              <span className={styles.item__value}>
                {product.screen.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
            <li className={styles.techSpecs__item}>
              <span className={styles.item__label}>Resolution</span>
              <span className={styles.item__value}>
                {product.resolution.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
            <li className={styles.techSpecs__item}>
              <span className={styles.item__label}>Processor</span>
              <span className={styles.item__value}>
                {product.processor.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
            <li className={styles.techSpecs__item}>
              <span className={styles.item__label}>RAM</span>
              <span className={styles.item__value}>
                {product.ram.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
            <li className={styles.techSpecs__item}>
              <span className={styles.item__label}>Built in memory</span>
              <span className={styles.item__value}>
                {product.capacity.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
              </span>
            </li>
            {product.camera && (
              <li className={styles.techSpecs__item}>
                <span className={styles.item__label}>Camera</span>
                <span className={styles.item__value}>
                  {product.camera.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
                </span>
              </li>
            )}
            {product.zoom && (
              <li className={styles.techSpecs__item}>
                <span className={styles.item__label}>Zoom</span>
                <span className={styles.item__value}>
                  {product.zoom.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')}
                </span>
              </li>
            )}
            {product.cell && (
              <li className={styles.techSpecs__item}>
                <span className={styles.item__label}>Cell</span>
                <span className={styles.item__value}>
                  {product.cell.join(', ')}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
