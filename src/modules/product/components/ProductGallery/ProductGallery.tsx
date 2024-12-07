import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box } from '@shared/base/Box';

import { ProductGallerySkeleton } from './components/ProductGallerySkeleton';
import { useProductGallery } from './hooks/useProductGallery';
import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  title?: string;
  images?: string[];
  className?: string;
  isLoading?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  title,
  className,
  isLoading,
}) => {
  const { mainSliderConfig, thumbsSliderConfig } = useProductGallery();

  if (isLoading) {
    return <ProductGallerySkeleton />;
  }

  if (!images) {
    return null;
  }

  return (
    <Box className={cn(styles.gallery, className)}>
      <Swiper className={styles.main} {...mainSliderConfig}>
        {images.map(image => (
          <SwiperSlide key={image}>
            <img src={image} alt={title} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper className={styles.thumbs} {...thumbsSliderConfig}>
        {images.map(image => (
          <SwiperSlide key={image}>
            <img src={image} alt={title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
