import { useEffect, useState } from 'react';
import './ImageGallery.scss';

interface Props {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: Props) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(0);
  }, [images]);

  return (
    <div className="image-gallery">
      <div className="image-gallery__thumbnails">
        {images.map((img, i) => (
          <button
            key={img}
            className={`image-gallery__thumb${i === selected ? ' image-gallery__thumb--active' : ''}`}
            onClick={() => setSelected(i)}
            aria-label={`View image ${i + 1}`}
          >
            <img src={img} alt={`${name} view ${i + 1}`} />
          </button>
        ))}
      </div>

      <div className="image-gallery__main">
        <img src={images[selected]} alt={name} />
      </div>
    </div>
  );
}
