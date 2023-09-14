import classNames from 'classnames';
import './Galery.scss';

import { IMAGE_URL } from '../../../helpers/IMAGE_URL';

type Props = {
  photos: string[],
  mainPhoto: string,
  photoClick: (photo: string) => void,
};

export const Galery: React.FC<Props> = ({
  photos,
  mainPhoto,
  photoClick,
}) => (
  <div className="galery">
    <ul className="galery__list">
      {photos.map(currentImage => (
        <button
          type="button"
          key={currentImage}
          onClick={() => photoClick(currentImage)}
          className={classNames('galery__photo', {
            'galery__photo-active': mainPhoto === currentImage,
          })}
        >
          <div className="galery__photo-container">
            <img
              className="galery__photo--item"
              src={`${IMAGE_URL}${currentImage}`}
              alt="product"
            />
          </div>
        </button>
      ))}
    </ul>

    <div className="galery__main">
      <img
        className="galery__main--image"
        alt="the bigger one"
        src={`${IMAGE_URL}${mainPhoto}`}
      />
    </div>
  </div>
);
