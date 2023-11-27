import classNames from 'classnames';
import React, { useMemo } from 'react';
import { getNumbers } from '../../helpers/helpers';

type Props = {
  productData: { [key: string]: string };
  currentPhoto: number;
  onPhotoChange: (id: number) => void;
};

export const DetailsPhotos: React.FC<Props> = ({
  productData,
  currentPhoto,
  onPhotoChange,
}) => {
  const photosIndexes = useMemo(() => getNumbers(3), []);

  return (
    <div className="details__photos">
      <div className="details__photos-sml">
        {photosIndexes.map(photoId => (
          <button
            type="button"
            key={photoId}
            className={classNames(
              'details__photo-btn',
              {
                'details__photo-btn--active': photoId === currentPhoto,
              },
            )}
            onClick={() => onPhotoChange(photoId)}
          >
            <img
              className="details__img-sml"
              src={`./img/apple/${productData?.name}-${productData?.model}-${productData?.color}-${photoId}.jpg`}
              alt="phone"
            />
          </button>
        ))}
      </div>

      <div className="details__photo-l">
        <img
          className="details__img-l"
          src={`./img/apple/${productData?.name}-${productData?.model}-${productData?.color}-${currentPhoto}.jpg`}
          alt="phone"
        />
      </div>
    </div>
  );
};
