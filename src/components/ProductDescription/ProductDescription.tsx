import { ProductDetails } from '../../types/productDetails';
import styles from './productDescription.module.scss';

interface Props {
  product: ProductDetails;
}

export const ProductDescription = ({ product }: Props) => {
  const fields = [
    { title: 'Screen', value: product.screen },
    { title: 'Resolution', value: product.resolution },
    { title: 'Processor', value: product.processor },
    { title: 'RAM', value: product.ram },
    { title: 'Built in memory', value: product.capacity },
    ...(product.camera ? [{ title: 'Camera', value: product.camera }] : []),
    ...(product.zoom ? [{ title: 'Zoom', value: product.zoom }] : []),
    { title: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <>
      <div className={styles.description__about}>
        <h1 className={styles.description__title}>About</h1>
        <div>
          {product.description.map(section => (
            <div key={section.title}>
              <h2 className={styles.section__title}>{section.title}</h2>

              <div>
                {section.text.map((paragraph, index) => (
                  <p key={index} className={styles.section__paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.description__characteristics}>
        <h1 className={styles.description__title}>Tech specs</h1>

        <div className={styles.characteristics}>
          {fields.map(({ title, value }) => (
            <div key={title} className={styles.characteristics__title}>
              {title}
              <p className={styles.characteristics__value}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
