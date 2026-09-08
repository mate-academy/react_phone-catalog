import { ProductSlider } from '../ProductSlider';
import styles from './NewModels.module.scss';

export const NewModels = () => {
  return (
    <section className={styles['new-models']}>
      <div className="container">
        <h2 className={`title ${styles['new-models__title']}`}>
          Brand new models
        </h2>
        <ProductSlider detailProduct={undefined} />
      </div>
    </section>
  );
};
