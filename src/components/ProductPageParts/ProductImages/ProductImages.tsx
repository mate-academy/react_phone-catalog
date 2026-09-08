import React from 'react';
import cl from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import s from './ProductImages.module.scss';

interface Props {
  images: string[];
  mainImg: string;
  onChangeImage: (img: string) => void;
}

export const ProductImages: React.FC<Props> = ({
  images,
  mainImg,
  onChangeImage,
}) => {
  return (
    <div className={s.ProductImages}>
      <div className={s.ProductImages__otherImages}>
        {images.map((img, i) => (
          <img
            className={cl(s.ProductImages__image, {
              [s.ProductImages__imageActive]: mainImg === img,
            })}
            key={i}
            src={img}
            alt=""
            onClick={() => onChangeImage(img)}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.img
          key={mainImg}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={s.ProductImages__mainImg}
          src={mainImg}
          alt="image-model  "
        />
      </AnimatePresence>
    </div>
  );
};
