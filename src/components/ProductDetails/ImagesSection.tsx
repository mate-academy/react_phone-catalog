import { useState, useEffect } from 'react';
import classnames from 'classnames';

type Props = {
  images: string[],
};

const ImagesSection:React.FC<Props> = ({
  images,
}) => {
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const hasPages = images.length > 5;
  const visibleImages = hasPages
    ? [...images].slice((page - 1) * 4, page * 4)
    : images;

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images[0]]);

  return (
    <>
      <div className="product-details__image-selection">
        {hasPages && page === 2 && (
          <button
            type="button"
            className="
            product-details__prev-page
            product-details__image-button"
            onClick={() => {
              setPage(1);
            }}
          >
            {}
          </button>
        )}
        {visibleImages.map((path) => {
          const isSelected = path === selectedImage;

          return (
            <button
              key={path}
              type="button"
              className={classnames(
                'product-details__image',
                'product-details__image-button',
                { 'product-details__image-button--selected': isSelected },
              )}
              style={{ backgroundImage: `url(${path})` }}
              onClick={() => {
                setSelectedImage(path);
              }}
            >
              {}
            </button>
          );
        })}
        {hasPages && page === 1 && (
          <button
            type="button"
            className="
            product-details__next-page
            product-details__image-button"
            onClick={() => {
              setPage(2);
            }}
          >
            {}
          </button>
        )}
      </div>
      <div
        className="product-details__image product-details__selected-image"
        style={{ backgroundImage: `url(${selectedImage})` }}
      >
        {}
      </div>
    </>
  );
};

export default ImagesSection;
