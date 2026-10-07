import styles from './ProductGallery.module.scss';
import { useEffect, useState } from 'react';

type ProductGalleryProps = {
  image: string;
  name: string;
};

export const ProductGallery = ({ image, name }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const [productGallery, setProductGallery] = useState<string[]>([]);

  useEffect(() => {
    setSelectedImage(image);

    const images = [0, 1, 2, 3, 4].map(index =>
      image.replace('00.webp', `${String(index).padStart(2, '0')}.webp`),
    );

    const checkImages = async () => {
      const existingImages = await Promise.all(
        images.map(
          imagePath =>
            new Promise<string | null>(resolve => {
              const img = new Image();

              img.onload = () => resolve(imagePath);
              img.onerror = () => resolve(null);

              img.src = imagePath;
            }),
        ),
      );

      const gallery = existingImages.filter(
        (imagePath): imagePath is string => imagePath !== null,
      );

      setProductGallery(gallery);
    };

    checkImages();
  }, [image]);

  return (
    <section className={styles.product_gallery}>
      <p className={styles.product_gallery__title}>{name}</p>
      <div className={styles.product_gallery__content}>
        <img
          className={styles.product_gallery__img}
          src={selectedImage}
          alt={name}
        />

        <div className={styles.product_gallery__container}>
          {productGallery.map(imagePath => (
            <button
              className={`${styles.product_gallery__container__button} ${
                imagePath === selectedImage
                  ? styles.product_gallery__container__button__active
                  : ''
              }`}
              type="button"
              key={imagePath}
              onClick={() => setSelectedImage(imagePath)}
            >
              <img src={imagePath} alt={name} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
