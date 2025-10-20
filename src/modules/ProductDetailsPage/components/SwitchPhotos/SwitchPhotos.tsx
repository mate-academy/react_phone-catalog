import { useProduct } from '../../hooks/ProductContext';
import styles from './SwitchPhotos.module.scss';

export const SwitchPhotos = () => {
  const { product, activeImage } = useProduct();

  return (
    <div className={styles.switchPhotos}>
      <img className={styles.img} src={activeImage} alt={product.itemId} />
    </div>
  );
};
