import React, { useState, useEffect } from 'react';
import cn from 'classnames';

type GalleryProps = {
  images: string[];
  name: string;
};

export const Gallery: React.FC<GalleryProps> = ({ images, name }) => {
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    setActiveLink(images[0])
  }, [images])

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
   const { src } = e.target as HTMLImageElement;
   setActiveLink(src);
  }

  return (
    <section className="gallery">
      <div className="gallery__img-container">
        <ul className="gallery__img-list">
          {images.map((image) => (
            <li className={cn('gallery__img-item', {'gallery__img-item--active': activeLink.includes(image)})}
              key={image}
            >
              <a href="./#" >
                <img
                  src={image}
                  alt={name}
                  className="gallery__img"
                  onClick={handleClick}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="gallery__main-img">
          <img
            src={activeLink}
            alt={name}
            className="gallery__img"
          />
        </div>
      </div>
    </section>
  )
}
