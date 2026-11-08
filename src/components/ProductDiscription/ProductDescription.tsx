import styles from './ProductDescription.module.scss';

interface DescriptionSection {
  title: string;
  text: string[];
}

interface ProductDescriptionProps {
  product: {
    description: DescriptionSection[];
    screen: string;
    resolution: string;
    processor: string;
    ram: string;
    camera: string;
    zoom: string;
    cell: string[];
  };
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>About</h2>
        <hr className={styles.line} />

        {product.description?.map((item, index) => (
          <div key={index} className={styles.descriptionBlock}>
            <h3>{item.title}</h3>
            {item.text.map((paragraph, pIndex) => (
              <p className={styles.paragraph} key={pIndex}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.specsSection}>
        <h2 className={styles.sectionTitle}>Tech specs</h2>
        <hr className={styles.line} />

        <ul className={styles.specsList}>
          {product.screen && (
            <div className={styles.specRow}>
              <span className={styles.nameSpecs}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
          )}
          {product.resolution && (
            <div className={styles.specRow}>
              <span className={styles.nameSpecs}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
          )}
          {product.processor && (
            <div className={styles.specRow}>
              <span className={styles.nameSpecs}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
          )}
          {product.ram && (
            <div className={styles.specRow}>
              <span className={styles.nameSpecs}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          )}
          {product.camera && (
            <div className={styles.specRow}>
              <span className={styles.nameSpecs}>Camera</span>
              <span className={styles.specValue}>{product.camera}</span>
            </div>
          )}
          {product.zoom && (
            <div className={styles.specRow}>
              <span className={styles.nameSpecs}>Zoom</span>
              <span className={styles.specValue}>{product.zoom}</span>
            </div>
          )}
          {product.cell && (
            <div className={styles.specRow}>
              <span className={styles.nameSpecs}>Cell</span>
              <span className={styles.specValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
