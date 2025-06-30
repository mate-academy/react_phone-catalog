import { useEffect, useState } from 'react';
import { ProductDetails } from '../../../../types/Product';
import style from './ProductGallery.module.scss';

type Props = {
  productDetails: ProductDetails;
};

export const ProductGallery: React.FC<Props> = ({ productDetails }) => {
  const [img, setImg] = useState<string>(productDetails.images[0]);

  useEffect(() => {
    setImg(productDetails.images[0]);
  }, [productDetails.images]);

  const handleImgSelect = (image: string) => {
    const newImg = productDetails.images.find(i => i === image);

    if (!newImg) {
      return;
    }

    setImg(newImg);
  };

  return (
    <>
      <div className={style.imgWrapper}>
        <img
          id="largeImg"
          src={img}
          alt="main image"
          className={style.mainImg}
        />
      </div>
      <ul className={style.gallerySlider}>
        {productDetails.images.map((i, index) => (
          <li key={index} className={style.listItem}>
            <span
              title={`image ${index + 1}`}
              className={style.listLink}
              onClick={() => handleImgSelect(i)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleImgSelect(i);
                }
              }}
            >
              <img src={i} className={style.gallaryImg} alt={i} />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
