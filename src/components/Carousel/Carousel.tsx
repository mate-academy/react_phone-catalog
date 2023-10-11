import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Carousel.scss';
import { useSwipeable } from 'react-swipeable';

import { Button } from '@/components/Button';
import { CarouselImage } from '@/types/CarouselImage';
import { CurrentImage } from '@/types/CurrentImage';

type Props = {
  images: CarouselImage[],
};

enum Direction {
  left = 'left',
  right = 'right',
}

export const Carousel: React.FC<Props> = ({ images }) => {
  const [imagesScrolled, setImagesScrolled] = useState(0);
  const transform = `translate(-${imagesScrolled * 100}%, 0)`;
  const badges = [0, 1, 2];

  const handleSlide = (direction: Direction) => {
    setImagesScrolled(images => {
      switch (true) {
        case direction === Direction.left: {
          return images === CurrentImage.First
            ? CurrentImage.Last
            : images - 1;
        }

        case direction === Direction.right: {
          return images === CurrentImage.Last
            ? CurrentImage.First
            : images + 1
        }

        default:
          return images;
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSlide(Direction.right);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [imagesScrolled]);

  const mobileHandlers = useSwipeable({
    onSwipedLeft: () => handleSlide(Direction.right),
    onSwipedRight: () => handleSlide(Direction.left),
    trackMouse: true,
  });

  return (
    <div
      className="Carousel"
    >
      <div className="Carousel__container">
        <Button
          variant="arrow"
          arrowDirection="left"
          aria-label="carosuel-left"
          className="Carousel__button"
          onClick={() => handleSlide(Direction.left)}
        />

        <div className="Carousel__image-container">
          <ul
            className="Carousel__image-list"
            style={{ transform }}
            {...mobileHandlers}
          >
            {images.map(({ link, alt, images }) => (
              <li key={alt}>
                <Link to={link} className="Carousel__link">
                  <picture>
                    <source
                      media="(min-width:901px)"
                      srcSet={images[0]}
                    />
                    <img
                      src={images[1]}
                      alt={alt}
                      className="Carousel__image"
                    />
                  </picture>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant="arrow"
          className="Carousel__button"
          aria-label="carosuel-right"
          onClick={() => handleSlide(Direction.right)}
        />
      </div>

      <div className="Carousel__badges">
        {badges.map(badgeNumber => (
          <button
            key={badgeNumber}
            type="button"
            aria-label={`carousel-show-${badgeNumber + 1}-image`}
            className={classNames(
              'Carousel__badge',
              { 'Carousel__badge--active': imagesScrolled === badgeNumber },
            )}
            onClick={() => setImagesScrolled(badgeNumber)}
          />
        ))}
      </div>
    </div>
  );
};
