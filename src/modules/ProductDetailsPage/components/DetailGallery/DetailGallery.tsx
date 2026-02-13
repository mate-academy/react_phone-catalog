/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useMediaQuery } from 'react-responsive';
import 'react-image-gallery/styles/css/image-gallery.css';
import style from './detailGallery.module.scss';
import cn from 'classnames';

interface Props {
  images: string[];
}

export const DetailGallery: React.FC<Props> = React.memo(({ images }) => {
  const isTabletOrLarger = useMediaQuery({ query: '(min-width: 640px)' });
  const baseUrlRaw = import.meta.env.BASE_URL;

  const baseUrl = baseUrlRaw.endsWith('/')
    ? baseUrlRaw.slice(0, -1)
    : baseUrlRaw;

  const galleryImages = images.map(imgPath => {
    const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;

    return {
      original: `${baseUrl}/${cleanPath}`,
      thumbnail: `${baseUrl}/${cleanPath}`,
    };
  });

  return (
    <ImageGallery
      items={galleryImages}
      showPlayButton={false}
      showFullscreenButton={false}
      showNav={false}
      thumbnailPosition={isTabletOrLarger ? 'left' : 'bottom'}
      // slideOnThumbnailOver={true}
      lazyLoad={true}
      additionalClass={cn(style['detail-gallery'])}
    />
  );
});

DetailGallery.displayName = 'DetailGallery';
