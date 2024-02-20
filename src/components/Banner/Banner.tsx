/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import classNames from 'classnames';

import './Banner.scss';
import { BASE_URL } from '../../utils/constants';

interface Photo {
  id: number,
  src: string,
  description: string,
  preview?: string,
}

type Props = {
  photos: Photo[];
};

export const Banner:React.FC<Props> = ({ photos }) => {
  const [indexActivePhoto, setIndexActivePhoto] = useState(0);

  const handleNextImage = () => {
    setIndexActivePhoto(index => {
      if (index === photos.length - 1) {
        return 0;
      }

      return index + 1;
    });
  };

  const handlePrevImage = () => {
    setIndexActivePhoto(index => {
      if (index === 0) {
        return photos.length - 1;
      }

      return index - 1;
    });
  };

  if (!photos.length) {
    return null;
  }

  return (
    <section className="banner">
      <div className="banner__content">
        <div className="banner__slider">
          <button
            type="button"
            className="button button__arrow banner__button button__arrow--prev"
            onClick={handlePrevImage}
          >
            prev
          </button>

          <div className="banner__photos">
            {photos.map(({ src, id, description }) => (
              <img
                key={id}
                alt={description}
                src={`${BASE_URL}/${src}`}
                className="banner__photo"
                style={{ translate: `${-100 * indexActivePhoto}%` }}
              />
            ))}
          </div>

          <button
            type="button"
            className="button button__arrow banner__button button__arrow--next"
            onClick={handleNextImage}
          >
            next
          </button>
        </div>

        <div className="banner__dots">
          {photos.map(({ id }, index) => (
            <button
              key={id}
              type="button"
              className={classNames('banner__dot', {
                'banner__dot--active': index === indexActivePhoto,
              })}
              onClick={() => setIndexActivePhoto(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
