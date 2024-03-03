import classNames from 'classnames';
import {
  memo, useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Icon } from '../Icon';
import { Icons } from '../../types/Icons';
import { IMAGES } from '../../constants/constants';
import './Slider.scss';

export const Slider = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const widthSize = ref.current?.offsetWidth || 1040;
  const updateIndex = useCallback((newIndex: number) => {
    let index = newIndex;

    if (newIndex < 0) {
      index = 2;
    } else if (index >= 3) {
      index = 0;
    }

    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        return prev < 2 ? prev + 1 : 0;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <button
          className="slider__button slider__button-left"
          type="button"
          onClick={() => updateIndex(activeIndex - 1)}
          aria-label="<"
        >
          <Icon icon={Icons.ArrowLeft} />
        </button>
        <div className="slider__container" ref={ref}>
          <ul
            className="slider__list"
            style={{ transform: `translate(-${activeIndex * widthSize}px)` }}
          >
            {IMAGES.map(img => (
              <li className="slider__item" key={img}>
                <img
                  src={img}
                  alt="slider"
                  className="slider__img"
                />
              </li>
            ))}

          </ul>
        </div>

        <button
          className="slider__button slider__button-right"
          type="button"
          onClick={() => updateIndex(activeIndex + 1)}
          aria-label=">"
        >
          <Icon icon={Icons.ArrowRight} />
        </button>
      </div>
      <div className="slider__dots">
        {IMAGES.map((img, i) => (
          <button
            type="button"
            aria-label="position"
            key={img}
            onClick={() => setActiveIndex(i)}
            className={classNames('slider__dots-item', {
              'dots-active': activeIndex === i,
            })}
          />
        ))}
      </div>
    </div>
  );
});
