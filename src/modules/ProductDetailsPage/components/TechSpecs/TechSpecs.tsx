import { BlockInform } from '../../../shared/components/CardProduct/components';
import { InformMode } from '../../../shared/types/types';
import { useProduct } from '../../hooks/ProductContext';
import styles from './TechSpecs.module.scss';

export const TechSpecs = () => {
  const { product } = useProduct();

  return (
    <div className={styles.contentAboutTech}>
      <div className={styles.titleAboutTech}>Tech specs</div>
      <BlockInform element={product} mode={InformMode.TechSpecs} />
    </div>
  );
};
