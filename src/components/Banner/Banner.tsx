/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC, useState, useContext, useEffect,
} from 'react';
import cn from 'classnames';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IconButton } from '../IconButton';
import { useSwipe } from '../../hooks/useSwipe';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./Banner.module.scss');

const {
  Banner: banner,
  'Banner__slider-container': sliderContainer,
  'Banner__side-button': sideButton,
  Banner__slider: slider,
  'Banner__photo-container': photoContainer,
  Banner__photo: photo,
  Banner__buttons: buttons,
  Banner__button: button,
  'Banner__button--active': buttonActive,
  'Banner__button--dark': buttonDark,
  'Banner__button--active-dark': buttonActiveDark,
} = styles;

type Props = {
  className?: string;
};

export const Banner: FC<Props> = ({ className = '' }) => {
  const { isThemeDark } = useContext(ThemeContext);
  const [transform, setTransform] = useState(0);
  const [index, setIndex] = useState(0);

  const images = [
    './images/Banner-00.png',
    './images/Banner-01.png',
    './images/Banner-02.png',
  ];

  const handleSlideChange = (i: number) => {
    setIndex(i);
    setTransform(100 * i);
  };

  const {
    handleTouchStart,
    handleTouchMove,
  } = useSwipe(handleSlideChange, images.length - 1);

  useEffect(() => {
    const animate = () => {
      if (index < images.length - 1) {
        handleSlideChange(index + 1);
      } else {
        handleSlideChange(0);
      }
    };

    const timerId = setTimeout(animate, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [transform]);

  return (
    <div className={cn(
      className,
      banner,
    )}
    >
      <div className={sliderContainer}>
        <IconButton
          className={sideButton}
          arrow={{ direction: 'left', disabled: index === 0 }}
          onClick={() => handleSlideChange(index - 1)}
        />

        <div
          onTouchStart={handleTouchStart}
          onTouchMove={e => handleTouchMove(e, index)}
          className={slider}
        >
          {images.map((img) => (
            <div
              className={photoContainer}
              key={img}
              style={{ transform: `translateX(-${transform}%)` }}
            >
              <img
                className={photo}
                src={img}
                alt="banner"
              />
            </div>
          ))}
        </div>

        <IconButton
          className={sideButton}
          arrow={{ direction: 'right', disabled: index === images.length - 1 }}
          onClick={() => handleSlideChange(index + 1)}
        />
      </div>

      <div className={buttons}>
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => handleSlideChange(i)}
            type="button"
            className={cn(
              button,
              { [buttonDark]: isThemeDark },
              { [buttonActive]: i === index && !isThemeDark },
              { [buttonActiveDark]: i === index && isThemeDark },
            )}
          />
        ))}
      </div>
    </div>
  );
};

Banner.defaultProps = {
  className: '',
};
