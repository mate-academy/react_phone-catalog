/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useMediaQuery } from 'react-responsive';
import style from './detailGallery.module.scss';
import cn from 'classnames';

interface Props {
  images: string[];
}

export const DetailGallery: React.FC<Props> = React.memo(({ images }) => {
  const isTabletOrLarger = useMediaQuery({ query: '(min-width: 640px)' });

  // Використовуємо BASE_URL з Vite для коректного формування шляху
  const baseUrl = import.meta.env.BASE_URL;

  const galleryImages = images.map(imgPath => ({
    // Шляхи тепер формуються з BASE_URL
    original: `${baseUrl}${imgPath}`,
    thumbnail: `${baseUrl}${imgPath}`,
  }));

  return (
    <ImageGallery
      items={galleryImages}
      showPlayButton={false}
      showFullscreenButton={false}
      showNav={false}
      thumbnailPosition={isTabletOrLarger ? 'left' : 'bottom'}
      lazyLoad={true}
      additionalClass={cn(style['detail-gallery'])}
    />
  );
});

DetailGallery.displayName = 'DetailGallery';
