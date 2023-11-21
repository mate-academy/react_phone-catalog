import {
  FC,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import './styles.scss';
import { Phone } from '../../types/phone';
import { SliderList } from './components/SliderList';
import { useWindowSize } from '../../helpers/customHooks';

type Props = {
  title: string,
  items: Phone[],
  discount?: boolean,
};

type SlideWidthRef = RefObject<Element>;

export const ProductsSlider: FC<Props> = ({
  title,
  items,
  discount = true,
}) => {
  const [slide, setSlide] = useState(0);
  const [slideInBlock, setSlideInBlock] = useState(4);
  const widthBlockSlider = useRef(null);
  const [sliderWidth] = useWindowSize();

  const showDivWidth = (slideWidth: SlideWidthRef) => {
    if (slideWidth.current) {
      const { width } = slideWidth.current.getBoundingClientRect();
      const rounded = Math.round(width);

      if (rounded < 560) {
        setSlideInBlock(1);
      }

      if (rounded >= 560 && rounded < 605) {
        setSlideInBlock(2);
      }

      if (rounded <= 848 && rounded > 605) {
        setSlideInBlock(3);
      }

      if (rounded > 848) {
        setSlideInBlock(4);
      }
    }
  };

  const lastSlide = Math.ceil((items.length - slideInBlock) / slideInBlock);

  useEffect(() => {
    showDivWidth(widthBlockSlider);
  }, [sliderWidth]);

  const changeSlide = (direction = 1) => {
    let slideNumber = slide + direction;

    if (slideNumber < 0) {
      slideNumber = 0;
    }

    if (slideNumber >= lastSlide) {
      slideNumber = lastSlide;
    }

    setSlide(slideNumber);
  };

  return (
    <>
      <div className="block-header">
        <h3 className="block-header__title">{title}</h3>
        <div className="block-header__arrows arrows">
          <button
            type="button"
            className="arrows__arrow arrows__arrow--left"
            onClick={() => changeSlide(-1)}
            aria-label="previously"
            disabled={slide === 0}
          />
          <button
            type="button"
            className="arrows__arrow arrows__arrow--right"
            onClick={() => changeSlide(1)}
            aria-label="next"
            disabled={slide === lastSlide}
          />
        </div>
      </div>
      <div
        ref={widthBlockSlider}
        className="slider"
      >
        <SliderList
          slideNumber={slide}
          items={items}
          discount={discount}
        />
      </div>
    </>
  );
};

ProductsSlider.defaultProps = {
  discount: true,
};
