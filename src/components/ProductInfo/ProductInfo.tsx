import type { ProductDetails } from '../../types/ProductDetails';
import { formatMemory } from '../../utils/formatMemory';
import styles from './ProductInfo.module.scss';

interface Props {
  product: ProductDetails;
}

export const ProductInfo = ({ product }: Props) => {
  const specs = [
    { name: 'Screen', value: product.screen },
    { name: 'Resolution', value: product.resolution },
    { name: 'Processor', value: product.processor },
    { name: 'RAM', value: formatMemory(product.ram) },
    { name: 'Built in memory', value: formatMemory(product.capacity) },
    { name: 'Camera', value: product.camera },
    { name: 'Zoom', value: product.zoom },
    { name: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <div className={styles.info}>
      <section className={styles.about}>
        <h2 className={styles.heading}>About</h2>

        {product.description.map(block => (
          <article key={block.title} className={styles.block}>
            <h3 className={styles.blockTitle}>{block.title}</h3>

            {block.text.map(paragraph => (
              <p key={paragraph} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </section>

      <section className={styles.specsSection}>
        <h2 className={styles.heading}>Tech specs</h2>

        <dl className={styles.list}>
          {specs
            .filter(spec => spec.value)
            .map(spec => (
              <div key={spec.name} className={styles.row}>
                <dt className={styles.name}>{spec.name}</dt>
                <dd className={styles.value}>{spec.value}</dd>
              </div>
            ))}
        </dl>
      </section>
    </div>
  );
};
