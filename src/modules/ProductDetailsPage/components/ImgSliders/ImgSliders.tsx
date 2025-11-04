import { useProduct } from '../../../shared/hooks/ProductContext';
import styles from './ImgSliders.module.scss';

export const ImgSliders = () => {
  const { activeImagesList, activeImage, setActiveImage } = useProduct();

  return (
    <div className={styles.imgSliders}>
      {activeImagesList.map((el, i) => (
        <div
          key={i}
          onClick={() => setActiveImage(el)}
          className={`${styles.imgBox} ${activeImage === el ? styles.activeImage : ''}`}
        >
          <img src={el} alt={el} />
        </div>
      ))}
    </div>
  );
};
