import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  images?: string[];
};

export const ImageBlock: React.FC<Props> = ({ images }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(images && images[0]);

  useEffect(() => setSelectedPhoto(images && images[0]), [images]);

  return (
    <div className="product-details__product--photoBlock photoBlock">
      <div className="photoBlock__small-photos">
        {images?.map(image => (
          <img
            key={image}
            src={image}
            onMouseEnter={() => setSelectedPhoto(image)}
            className={classNames('photoBlock__small-photos--photo', {
              'photoBlock__small-photos--photo-active': selectedPhoto === image,
            })}
          />
        ))}
      </div>

      <div className="photoBlock__big-photo">
        <img
          src={selectedPhoto}
          alt="selectedPhoto"
          className="photoBlock__big-photo--photo"
        />
      </div>
    </div>
  );
};
