import { useState } from 'react';

import './photo.scss';

type Props = {
  listImages: string[],
};

export const Photos:React.FC<Props> = ({ listImages }) => {
  const [photo, setPhoto] = useState(listImages[0]);

  const choosePhoto = (image:string) => {
    setPhoto(image);
  };

  return (
    <div className="list-photo-details">
      <div className="wrapper-photo">
        {listImages.map((el: string) => (
          <button
            type="button"
            className="list-photo-details__image"
            onClick={() => choosePhoto(`./${el}`)}
            key={el}
          >
            <img
              src={`./${el}`}
              alt="product"
            />
          </button>
        ))}
      </div>
      <div className="wrapper-photo">
        <img src={photo} alt="selected" />
      </div>
    </div>
  );
};
