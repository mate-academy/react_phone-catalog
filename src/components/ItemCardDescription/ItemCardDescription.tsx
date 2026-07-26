import { ProductCatalogAPI } from '../../types';
import styles from './ItemCardDescription.module.scss';

const ItemCardDescription = ({ product }: { product: ProductCatalogAPI }) => {
  const specs = [
    { title: 'Screen', value: product.screen },
    { title: 'Resolution', value: product.resolution },
    { title: 'Processor', value: product.processor },
    { title: 'RAM', value: product.ram },
    { title: 'Camera', value: product.camera },
    { title: 'Zoom', value: product.zoom },
    { title: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <>
      <div className={styles.itemCardDescription}>
        <div className={styles.itemCardDescription__about}>
          <h2 className={styles.itemCardDescription_title}>About</h2>
          <span className={styles.itemCardDescription_line}></span>

          <div className={styles.itemCardDescription__about_list}>
            {product.description.map((item, index) => (
              <div
                className={styles.itemCardDescription__about_item}
                key={index}
              >
                <h3 className={styles.itemCardDescription__about_item_title}>
                  {item.title}
                </h3>
                <p className={styles.itemCardDescription__about_item_text}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.itemCardDescription__specs}>
          <h1 className={styles.itemCardDescription_title}>Tech specs</h1>
          <span className={styles.itemCardDescription_line}></span>

          <div className={styles.itemCardDescription__specs_list}>
            {specs.map((spec, index) => (
              <div
                key={index}
                className={styles.itemCardDescription__specs_item}
              >
                <p className={styles.itemCardDescription__specs_item_title}>
                  {spec.title}
                </p>

                <p className={styles.itemCardDescription__specs_item_value}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCardDescription;
