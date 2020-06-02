import React from 'react';
import cn from 'classnames';

export const GalleryThumbnails = ({
  images,
  currentImageLink,
  title,
  handleClick }: GalleryThumbnailsProps) => {
  return (
    <div className="gallery__thumbnails">
      {images.map((link, index) => (
        <div
          className={cn({
            gallery__thumbnail: true,
            'gallery__thumbnail--active': currentImageLink.includes(link),
          })}
          key={link}
        >
          <a
            href="#!"
            className="gallery__link"
            onClick={handleClick}
          >
            <img
              src={link}
              alt={`${title} - ${index + 1}`}
              className="gallery__img"
            />
          </a>
        </div>
      ))}
    </div>
  )
}
