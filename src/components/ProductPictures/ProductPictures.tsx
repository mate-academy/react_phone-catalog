/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import './ProductPictures.scss';
import classNames from 'classnames';

type Props = {
  pictures: string[],
};

// eslint-disable-next-line max-len
const imageLinkPart = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const ProductPictures: React.FC<Props> = ({ pictures }) => {
  const [mainPicture, setMainPicture] = useState('');

  useEffect(() => {
    setMainPicture(pictures[0]);
  }, [pictures]);

  return (
    <>
      <ul className="ProductPictures__imgs-list">
        {pictures.map(picture => (
          <li key={picture}>
            <button
              type="button"
              className={classNames(
                'ProductPictures__img-button',
                { 'active-picture': picture === mainPicture },
              )}
              onClick={() => setMainPicture(picture)}
            >
              <img
                src={`${imageLinkPart}/${picture}`}
                alt="apple"
                className="ProductPictures__img"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="ProductPictures__img-container">
        <img
          src={`${imageLinkPart}/${mainPicture}`}
          alt="apple"
          className="ProductPictures__img"
        />
      </div>
    </>
  );
};
