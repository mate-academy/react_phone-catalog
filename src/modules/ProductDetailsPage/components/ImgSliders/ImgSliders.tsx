import { useEffect, useMemo, useState } from 'react';
import { useProduct } from '../../../shared/hooks/ProductContext';
import styles from './ImgSliders.module.scss';

export const ImgSliders = () => {
  const { product, activeImage, setActiveImage } = useProduct();
  const [images, setImages] = useState<string[]>([]);
  const newImg = useMemo(() => activeImage.replace(/\s+/g, ''), [activeImage]);

  useEffect(() => {
    const arrayLength = product.details?.images.length || 2;

    const newImages = Array.from({ length: arrayLength }, (_, i) =>
      newImg.replace('00.webp', `${String(i).padStart(2, '0')}.webp`),
    );

    setImages(newImages);
  }, [newImg, product.category, product.details?.images.length]);

  return (
    <div className={styles.imgSliders}>
      {images.map((el, i) => (
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
