import styles from './ProductImages.module.scss';
import cn from 'classnames';
import { HTMLAttributes } from 'react';
import { useSlider } from 'src/hooks/useSlider';

type Props = {
  images: string[];
} & HTMLAttributes<HTMLDivElement>;

export const ProductImages = ({ images, className }: Props) => {
  const { currentSlide, showSlide, handleSwipe } = useSlider(images.length);

  return (
    <div className={cn(styles.productImages, className)}>
      <img
        draggable={false}
        onPointerDown={event => handleSwipe(event)}
        onPointerUp={event => handleSwipe(event)}
        className={styles.mainImage}
        src={images[currentSlide]}
      />
      <div className={styles.thumbnails}>
        {images.map((el, index) => (
          <img
            onClick={() => {
              showSlide(index);
            }}
            className={cn(
              styles.thumbnail,
              index === currentSlide && styles.active,
            )}
            src={el}
            key={el}
          ></img>
        ))}
      </div>
    </div>
  );
};
