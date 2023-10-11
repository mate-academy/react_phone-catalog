import classNames from 'classnames';
import { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

type Props = {
  imagesUrl: string[],
};

export const ProductGallery: React.FC<Props> = ({ imagesUrl }) => {
  const [mainPhoto, setMainPhoto] = useState<string>(imagesUrl[0]);
  const altMainPhoto = mainPhoto.match(/[^\\/]+(?=\.\w+$)/) || '';
  const [position, setPosition] = useState(0);
  const frameSize = 4;
  const gap = 16;
  const animationDuration = 300;

  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 300,
  });

  const itemSize = width && width < 392 ? 60 : 80;
  const endPosition = (-itemSize - gap) * (imagesUrl.length - frameSize);
  const shift = itemSize + gap;

  const onClickGalleryItem = (imgUrl: string) => () => {
    if (imgUrl !== mainPhoto) {
      setMainPhoto(imgUrl);
    }
  };

  const getHeight = () => {
    if (imagesUrl.length > 5) {
      return frameSize * itemSize + gap * (frameSize - 1);
    }

    return imagesUrl.length * itemSize + gap * (imagesUrl.length - 1);
  };

  const onClickDown = () => {
    let currentPosition = position;

    currentPosition -= shift;
    currentPosition = Math.max(currentPosition, endPosition);

    setPosition(currentPosition);
  };

  const onClickUp = () => {
    let currentPosition = position;

    currentPosition += shift;
    currentPosition = Math.min(currentPosition, 0);
    setPosition(currentPosition);
  };

  return (
    <div className="product-gallery" ref={ref}>
      <div className="product-gallery__thumbnails-container">
        {imagesUrl.length > 5 && (
          <button
            type="button"
            className="
              product-gallery__thumbnail
              product-gallery__thumbnail--arrow
            "
            onClick={onClickUp}
            disabled={position === 0}
          >
            <span
              className={
                `icon ${position === 0 ? 'icon--up-disabled' : 'icon--up'}`
              }
            />
          </button>
        )}
        <div
          className="product-gallery__thumbnails"
          style={{
            height: `${getHeight()}px`,
          }}
        >
          <div
            className="product-gallery__list"
            style={{
              transition: `margin-top ${animationDuration}ms`,
              marginTop: `${position}px`,
            }}
          >
            {imagesUrl.map(image => {
              const nameImage = image.match(/[^\\/]+(?=\.\w+$)/) || '';

              return (
                <button
                  type="button"
                  className={classNames(
                    'product-gallery__thumbnail',
                    {
                      'product-gallery__thumbnail--active': image === mainPhoto,
                    },
                  )}
                  style={{ width: `${itemSize}px`, height: `${itemSize}px` }}
                  key={image}
                  onClick={onClickGalleryItem(image)}
                >
                  <img
                    src={`./${image}`}
                    alt={nameImage[0]}
                    className="product-gallery__image"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {imagesUrl.length > 5 && (
          <button
            type="button"
            className="
              product-gallery__thumbnail
              product-gallery__thumbnail--arrow
            "
            onClick={onClickDown}
            disabled={position === endPosition}
          >
            <span
              className={
                `icon ${position === endPosition ? 'icon--down-disabled' : 'icon--down'}`
              }
            />
          </button>
        )}
      </div>
      <div className="product-gallery__large-image-container">
        <img
          src={`./${mainPhoto}`}
          alt={altMainPhoto[0]}
          className="product-gallery__image"
        />
      </div>
    </div>
  );
};
