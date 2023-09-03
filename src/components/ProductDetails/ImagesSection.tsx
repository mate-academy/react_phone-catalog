import { useState, useEffect } from 'react';
import classnames from 'classnames';

import './ProductDetails.scss';

type Props = {
  images: string[],
};

export const ImagesSection: React.FC<Props> = ({
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

  const handlePageChange = (pageNumber: number) => () => setPage(pageNumber);
  const handleImgSelect = (path: string) => () => setSelectedImage(path);

  return (
    <>
      <div className="ProductDetails__image-selection">
        {hasPages && page === 2 && (
          <button
            type="button"
            className="
            ProductDetails__arrow-button
            ProductDetails__arrow-button--prev
            ProductDetails__image-button"
            onClick={handlePageChange(1)}
          >
            {' '}
          </button>
        )}
        {visibleImages.map((path) => {
          const isSelected = path === selectedImage;

          return (
            <button
              key={path}
              type="button"
              className={classnames(
                'ProductDetails__image',
                'ProductDetails__image-button',
                { 'ProductDetails__image-button--selected': isSelected },
              )}
              style={{ backgroundImage: `url(${path})` }}
              onClick={handleImgSelect(path)}
            >
              {' '}
            </button>
          );
        })}
        {hasPages && page === 1 && (
          <button
            type="button"
            className="
            ProductDetails__arrow-button
            ProductDetails__arrow-button--next
            ProductDetails__image-button"
            onClick={handlePageChange(2)}
          >
            {' '}
          </button>
        )}
      </div>
      <div
        className="ProductDetails__image ProductDetails__selected-image"
        style={{ backgroundImage: `url(${selectedImage})` }}
      >
        {' '}
      </div>
    </>
  );
};
