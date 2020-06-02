import React, { useState } from 'react';
import cn from 'classnames'

export const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const [currentImageLink, setCurrentImageLink] = useState<string>(images[0]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { src } = e.target as HTMLImageElement;

    if (src) {
      setCurrentImageLink(src);
    }
    console.dir(e.target);
  }

  return (
    <div className="gallery">
      <div className="gallery__thumbnails">
        {images.map((link, index) => (
          <div className={cn({
            "gallery__thumbnail": true,
            "gallery__thumbnail--active": currentImageLink.includes(link)
          })} key={link}>
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
      <div className="gallery__photo gallery__photo--lg">
          <img
            src={currentImageLink}
            alt={title}
            className="gallery__img"
          />
      </div>
    </div>
  )
}
