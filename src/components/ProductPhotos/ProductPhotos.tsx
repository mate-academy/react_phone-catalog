import './productPhotos.scss';
import classNames from 'classnames';

type Props = {
  photos: string[],
  mainPhoto: string
  handleChangePhoto: (photo: string) => void,
};

export const ProductPhoto: React.FC<Props> = ({
  photos,
  mainPhoto,
  handleChangePhoto,
}) => {
  return (
    <div className="product-photos">
      <ul className="product-photos__list">
        {photos.map(img => (
          <button
            type="button"
            key={img}
            className={classNames('product-photos__photo-item', {
              'product-photos__photo-item--active': mainPhoto === img,
            })}
            onClick={() => handleChangePhoto(img)}
          >
            <div className="product-photos__photo-item-box">
              <img
                src={`./new/${img}`}
                alt="product-img"
              />
            </div>
          </button>
        ))}
      </ul>
      <div className="product-photos__main-photo">
        <div className="product-photos__main-photo-box">
          <img
            className="product-photos__main-photo-img"
            src={`./new/${mainPhoto}`}
            alt={mainPhoto}
          />
        </div>
      </div>
    </div>
  );
};
