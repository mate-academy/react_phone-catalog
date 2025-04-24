import {
  useState,
  useEffect,
  useRef,
  useContext,
  FC,
  useCallback,
} from 'react';
import './PicturesSlider.scss';
import { Icon } from '../../../shared/Icon';
import { icons } from '../../../../constants/iconsObject';
import { GlobalContext } from '../../../../context/GlobalContext';
import { Link } from 'react-router-dom';

export const PicturesSlider: FC = () => {
  const images = [
    'img/phones/apple-iphone-14/midnight/00.webp',
    'img/phones/apple-iphone-14/purple/00.webp',
    'img/phones/apple-iphone-14/yellow/00.webp',
  ];

  const imagesUrl: Record<number, string> = {
    0: 'phones/apple-iphone-14-128gb-midnight',
    1: 'phones/apple-iphone-14-128gb-purple',
    2: 'phones/apple-iphone-14-128gb-yellow',
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useContext(GlobalContext);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(
    () => setCurrentSlide(prev => (prev + 1) % images.length),
    [images.length],
  );

  const prevSlide = useCallback(
    () => setCurrentSlide(prev => (prev - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentSlide(index);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(nextSlide, 5000);
    },
    [nextSlide],
  );

  const handleNextButton = useCallback(() => {
    nextSlide();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  const handlePrevButton = useCallback(() => {
    prevSlide();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide, prevSlide]);

  return (
    <div className="picturesSlider">
      <div className="picturesSlider__container">
        <div className="picturesSlider__button" onClick={handlePrevButton}>
          <Icon icon={icons.arrow_left[theme]} />
        </div>

        <div className="picturesSlider__content">
          <div className="picturesSlider__aside">
            <div>
              <div>
                <div className="picturesSlider__aside-title">
                  Now available{' '}
                </div>
                <span className="picturesSlider__aside-title">
                  in our store!
                </span>
                <span className="picturesSlider__aside-smile">👌</span>
              </div>

              <div className="picturesSlider__aside-description">
                Be the first!
              </div>
            </div>

            <Link
              to={imagesUrl[currentSlide]}
              className="picturesSlider__aside-action"
            >
              Order now
            </Link>
          </div>

          <div className="picturesSlider__container-image">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Slide"
                className={
                  currentSlide === index
                    ? 'picturesSlider__image picturesSlider__image--active'
                    : 'picturesSlider__image'
                }
              />
            ))}
          </div>
        </div>

        <div className="picturesSlider__button" onClick={handleNextButton}>
          <Icon icon={icons.arrow_right[theme]} />
        </div>
      </div>

      <div className="picturesSlider__dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={
              currentSlide === index
                ? 'picturesSlider__dot picturesSlider__dot--active'
                : 'picturesSlider__dot'
            }
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
