import { FC, useState } from 'react';
import s from './ProductImagesGallery.module.scss';

interface Props {
  images: string[];
  alt: string;
}
export const ProductImagesGallery: FC<Props> = ({ images, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={s.gallery}>
      <div className={s.mainImageWrapper}>
        <img className={s.mainImage} src={images[activeIndex]} alt={alt} />
      </div>

      <div className={s.thumbnails}>
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            className={index === activeIndex ? s.thumbActive : s.thumb}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
