/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import './ProductPictures.scss';
import classNames from 'classnames';

type Props = {
  pictures: string[],
};

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
                src={`_new/${picture}`}
                alt="apple"
                className="ProductPictures__img"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="ProductPictures__img-container">
        <img
          src={`_new/${mainPicture}`}
          alt="apple"
          className="ProductPictures__img"
        />
      </div>
    </>
  );
};
