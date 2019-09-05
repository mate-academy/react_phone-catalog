import React from 'react';
import { Gallery, GalleryImage } from 'react-gesture-gallery';

const ImagesCarousel = ({ image }) => {
  const [index, setIndex] = React.useState(0);

  return (
    <Gallery
      style={{
        height: '60vh',
        width: '60vw',
      }}
      index={index}
      onRequestChange={(i) => {
        setIndex(i);
      }}
    >
      {image.map(image => (
        <GalleryImage objectFit="contain" key={image} src={image} />
      ))}
    </Gallery>
  );
};

export default ImagesCarousel;
