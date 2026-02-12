import classNames from 'classnames';
import styles from './TechSpecsSection.module.scss';
import { ProductDetail } from '../../../../types/productDetail';

type Props = {
  curProduct: ProductDetail;
};

export const TechSpecsSection: React.FC<Props> = ({ curProduct }) => {
  return (
    <section className={classNames(styles.TechSpecsSection)}>
      <h3>Tech specs</h3>

      <hr />

      <ul className={styles.TechSpecsSection__list}>
        <li className={styles.TechSpecsSection__item}>
          <span>Screen</span>
          <p>{curProduct.screen}</p>
        </li>

        <li className={styles.TechSpecsSection__item}>
          <span>Resolution</span>
          <p>{curProduct.resolution}</p>
        </li>

        <li className={styles.TechSpecsSection__item}>
          <span>Processor</span>
          <p>{curProduct.processor}</p>
        </li>

        <li className={styles.TechSpecsSection__item}>
          <span>Built in memory</span>
          <p>{curProduct.capacity}</p>
        </li>

        {curProduct.camera && (
          <li className={styles.TechSpecsSection__item}>
            <span>Camera</span>
            <p>{curProduct.camera}</p>
          </li>
        )}

        {curProduct.zoom && (
          <li className={styles.TechSpecsSection__item}>
            <span>Zoom</span>
            <p>{curProduct.zoom}</p>
          </li>
        )}

        <li className={styles.TechSpecsSection__item}>
          <span>Cell</span>
          <p>{curProduct.cell.toString().split(',').join(', ')}</p>
        </li>
      </ul>
    </section>
  );
};
