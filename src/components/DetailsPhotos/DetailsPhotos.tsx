import './DetailsPhotos.scss';

import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../helpers/getNumbers';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  details?: ProductDetails;
};

export const DetailsPhotos: React.FC<Props> = ({ details }) => {
  const photosIndexes = getNumbers(0, details ? details?.images.length - 1 : 0);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const onPhotoChange = useCallback(
    (id: number) => setCurrentPhoto(id), [currentPhoto],
  );

  return (
    <div className="photos__box">
      <ul className="photos__list">
        {photosIndexes.map(photoId => (
          <li className="photos__item">
            <button
              type="button"
              key={photoId}
              className={classNames(
                'photos__button',
                {
                  'photos__button--active':
                    photoId === currentPhoto,
                },
              )}
              onClick={() => onPhotoChange(photoId)}
            >
              <img
                src={`${details?.images[photoId]}`}
                alt={details?.images[photoId]}
                className="photos__image"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="photos__landscape">
        <img
          src={`${details?.images[currentPhoto]}`}
          alt={details?.name}
          className="photos__image"
        />
      </div>
    </div>
  );
};
