import { useEffect, useState } from 'react';
import s from './ProductGallery.module.scss';
import { BASE_URL } from '../../../../utils/variables/base';

type Props = {
  images: string[];
  name: string;
};

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const [mainImg, setMainImg] = useState(images[0]);

  useEffect(() => {
    setMainImg(images[0]);
  }, [images]);

  return (
    <div className={s.gallery}>
      <div className={s.galleryMain}>
        <img
          src={`${BASE_URL}${mainImg}`}
          alt={name}
          className={s.galleryImage}
        />
      </div>

      <div className={s.galleryThumbnails}>
        {images.slice(0, images.length - 1).map(image => (
          <button
            key={image}
            type="button"
            className={`${s.galleryThumb} ${
              mainImg === image ? `${s.active}` : ''
            }`}
            onClick={() => setMainImg(image)}
          >
            <img
              src={`${BASE_URL}${image}`}
              alt={name}
              className={s.galleryThumbImage}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
