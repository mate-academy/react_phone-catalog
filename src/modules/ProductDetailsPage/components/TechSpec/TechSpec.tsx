import { ProductFullInfo } from '../../../shared/Utills/types';
import styles from './TechSpec.module.scss';

type Props = {
  selectedProduct: ProductFullInfo | null;
};

export const TechSpec: React.FC<Props> = ({ selectedProduct }) => {
  return (
    <section className={styles.tech__spec}>
      <h3>Tech specs</h3>

      <div className={styles.polosa}></div>

      <div className={styles.tech__spec__container}>
        <div>
          <p>Screen</p>
          <p>{selectedProduct?.screen}</p>
        </div>

        <div>
          <p>Resolution</p>
          <p>{selectedProduct?.resolution}</p>
        </div>

        <div>
          <p>Processor</p>
          <p>{selectedProduct?.processor}</p>
        </div>

        <div>
          <p>RAM</p>
          <p>{selectedProduct?.ram}</p>
        </div>

        <div>
          <p>Built in memory</p>
          <p>{selectedProduct?.capacity}</p>
        </div>

        <div>
          <p>Camera</p>
          <p>{selectedProduct?.camera}</p>
        </div>

        <div>
          <p>Zoom</p>
          <p>{selectedProduct?.zoom}</p>
        </div>

        <div>
          <p>Cell</p>

          <div className={styles.cell__container}>
            {selectedProduct?.cell.map((c, i) => (
              <p key={i}>
                {c}
                {i !== selectedProduct.cell.length - 1 && ','}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
