import React, { memo, useCallback, useState } from 'react';

interface Props {
  images: string[],
  altes?: string[],
}

export const ImageGalleryWithChoice: React.FC<Props> = memo(({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const restImages = images.filter(image => image !== selectedImage);

  const selectImage = useCallback((img: string) => {
    return () => {
      setSelectedImage(img)
    };
  }, []);

  return (
    <section className='image-gallery-with-choice'>
      <div className='image-gallery-with__rest-images'>
        {restImages.map(img => (
          <ImageItem
            key={img}
            img={img}
            selectImage={selectImage}
          />
        ))}
      </div>

      <div className='image-gallery-with-choice__selected-image-block'>
        <img
          className='image-gallery-with-choice__selected-image-block'
          src={selectedImage}
          alt="selected Image Product"
        />
      </div>
    </section>
  );
});

interface ImageProps {
  img: string,
  selectImage: (img: string) => () => void;
}

const ImageItem: React.FC<ImageProps> = memo(({ img, selectImage }) => (
  <img
    className='image-gallery-with-choice__image'
    src={img}
    alt='Product image'
    onClick={selectImage(img)}
  /> //need normal alt attribute
))
