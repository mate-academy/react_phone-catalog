/* eslint-disable no-console */
import Slider from 'react-slick';
import { useRef, useState } from 'react';
import { CardGadget } from '../CardGadget';
import { PrevArrow } from './PrevArrow';
import { NextArrow } from './NextArrow';
import { Gadget } from '../../support/types';

type Props = {
  className?: string;
  slideStyle?: string;
  prevStyle?: string;
  nextStyle?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
  arrows?: boolean;
  dots?: boolean;
  infinite: boolean;
  initialSlide?: number;
  speed?: number;
  slidesToShow: number;
  slidesToScroll?: number;
  data: string[] | Gadget[];
};

export const Carousel: React.FC<Props> = ({
  className,
  slideStyle,
  nextStyle,
  prevStyle,
  slidesToShow,
  infinite,
  data,
  ...rest
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [activeSlideNum, setActiveSlideNum] = useState(slidesToShow);

  return (
    <div className={`relative ${className}`}>
      <PrevArrow
        prevStyle={prevStyle}
        sliderRef={sliderRef}
        number={activeSlideNum}
        setNumber={setActiveSlideNum}
        infinite={infinite}
      />
      <NextArrow
        nextStyle={nextStyle}
        sliderRef={sliderRef}
        number={activeSlideNum}
        limit={data.length}
        infinite={infinite}
        setNumber={setActiveSlideNum}
      />

      <Slider
        ref={sliderRef}
        slidesToShow={slidesToShow}
        infinite={infinite}
        {...rest}
      >
        {data.map((item) => {
          if (typeof item === 'string') {
            return (
              <img className={slideStyle} src={item} alt="slide" key={item} />
            );
          }

          return <CardGadget item={item} key={item.id} />;
        })}
      </Slider>
    </div>
  );
};
