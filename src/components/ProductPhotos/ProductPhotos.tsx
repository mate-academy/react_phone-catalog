import {
  FC, useContext, useEffect, useState,
} from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useSwipe } from '../../hooks/useSwipe';
import { Styles } from '../../types/Styles';
import { ThemeContext } from '../../contexts/ThemeContext';

const styles: Styles = require('./ProductPhotos.module.scss');

const {
  ProductPhotos: photos,
  'ProductPhotos__slider-container': sliderContainer,
  'ProductPhotos__photo-container': photoContainer,
  ProductPhotos__buttons: buttons,
  ProductPhotos__button: button,
  'ProductPhotos__button--active': buttonActive,
  'ProductPhotos__button--dark': buttonDark,
  'ProductPhotos__button--active-dark': buttonActiveDark,
  ProductPhotos__photo: photo,
} = styles;

type Props = {
  className?: string,
  images: string[],
};

export const ProductPhotos: FC<Props> = ({
  className = '',
  images,
}) => {
  const { productID } = useParams();
  const { isThemeDark } = useContext(ThemeContext);
  const [mainPhoto, setMainPhoto] = useState(images[0]);
  const [transform, setTransform] = useState(0);

  const handleSlideChange = (i: number) => {
    if (i === images.indexOf(mainPhoto)) {
      return;
    }

    setTransform(100 * i);
    setMainPhoto(images[i]);
  };

  const {
    handleTouchStart,
    handleTouchMove,
  } = useSwipe(handleSlideChange, images.length - 1);

  useEffect(() => {
    setMainPhoto(images[0]);
    setTransform(0);
  }, [productID]);

  return (
    <div className={cn(
      photos,
      className,
    )}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => handleTouchMove(e, images.indexOf(mainPhoto))}
        className={sliderContainer}
      >
        {images.map((image, i) => (
          <div
            className={photoContainer}
            key={image}
            style={{ transform: `translateX(-${transform}%)` }}
          >
            <img
              className={photo}
              src={image}
              alt={`0${i}`}
            />
          </div>
        ))}
      </div>

      <div className={buttons}>
        {images.map((image, i) => (
          <button
            onClick={() => handleSlideChange(i)}
            type="button"
            key={image}
            className={cn(
              button,
              { [buttonDark]: isThemeDark },
              { [buttonActive]: image === mainPhoto },
              { [buttonActiveDark]: isThemeDark && image === mainPhoto },

            )}
          >
            <img
              className={photo}
              src={image}
              alt={`0${i}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

ProductPhotos.defaultProps = {
  className: '',
};
