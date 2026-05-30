import {
  useState,
  useEffect,
  useRef,
  useContext,
  FC,
  useCallback,
} from 'react';

import { Link } from 'react-router-dom';
import { Icon } from '../../../shared/Icon';
import { icons } from '../../../../constants/icons.config';
import { GlobalContext } from '../../../../context/GlobalContext';
import { SlideData } from './types/types';
import './PicturesSlider.scss';

const SLIDES: SlideData[] = [
  {
    image: 'img/phones/apple-iphone-14/midnight/00.webp',
    url: 'phones/apple-iphone-14-128gb-midnight',
  },
  {
    image: 'img/phones/apple-iphone-14/purple/00.webp',
    url: 'phones/apple-iphone-14-128gb-purple',
  },
  {
    image: 'img/phones/apple-iphone-14/yellow/00.webp',
    url: 'phones/apple-iphone-14-128gb-yellow',
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

export const PicturesSlider: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useContext(GlobalContext);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = SLIDES.length;

  const goToNextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(goToNextSlide, AUTO_SLIDE_INTERVAL);
  }, [goToNextSlide]);

  useEffect(() => {
    resetAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoSlide]);

  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      resetAutoSlide();
    },
    [resetAutoSlide],
  );

  const handleNextClick = useCallback(() => {
    goToNextSlide();
    resetAutoSlide();
  }, [goToNextSlide, resetAutoSlide]);

  const handlePrevClick = useCallback(() => {
    goToPrevSlide();
    resetAutoSlide();
  }, [goToPrevSlide, resetAutoSlide]);

  const currentSlideData = SLIDES[currentSlide];

  return (
    <div className="picturesSlider">
      <div className="picturesSlider__container">
        <div className="picturesSlider__button" onClick={handlePrevClick}>
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
              to={currentSlideData.url}
              className="picturesSlider__aside-action"
            >
              Order now
            </Link>
          </div>

          <div className="picturesSlider__container-image">
            {SLIDES.map((slide, index) => (
              <img
                key={index}
                src={slide.image}
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

        <div className="picturesSlider__button" onClick={handleNextClick}>
          <Icon icon={icons.arrow_right[theme]} />
        </div>
      </div>

      <div className="picturesSlider__dots">
        {SLIDES.map((_, index) => (
          <div
            key={index}
            className={
              currentSlide === index
                ? 'picturesSlider__dot picturesSlider__dot--active'
                : 'picturesSlider__dot'
            }
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
