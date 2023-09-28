import React, { useState } from 'react';
import './DetailsImages.scss';
import classNames from 'classnames';
import { ProductFull } from '../../types/ProductFull';
import { BASE_URL } from '../../helpers/consts';

type Props = {
  product: ProductFull,
};

export const DetailsImages: React.FC<Props> = ({ product }) => {
  const { images } = product;
  const [selectImg, setSelectImg] = useState<string>(images[0]);

  return (
    <div className="details-images">
      <div className="details-images__small-images">
        {images.map(imgLink => (
          <button
            key={imgLink}
            type="button"
            className={classNames(
              'small-image__container',
              { 'is-active': imgLink === selectImg },
            )}
            onClick={() => setSelectImg(imgLink)}
          >
            <img
              src={`${BASE_URL}/${imgLink}`}
              alt={`${BASE_URL}/${imgLink}`}
              className="small-image"
            />
          </button>
        ))}
      </div>

      <div className="details-images__main-img-container">
        <img
          src={`${BASE_URL}/${selectImg}`}
          alt={`${BASE_URL}/${selectImg}`}
          className="details-images__main-img"
        />
      </div>
    </div>
  );
};
