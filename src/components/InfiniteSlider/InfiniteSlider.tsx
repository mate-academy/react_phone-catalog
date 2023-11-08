import { FC } from 'react';
// import Slider from 'react-slick';
import Slider, { CustomArrowProps } from 'react-slick';
import classNames from 'classnames';

import './InfiniteSlider.scss';

const SamplePrevArrow = ({
  currentSlide, slideCount, onClick, ...props
}: CustomArrowProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      type="button"
      className={classNames(
        'custom-slider-button',
        'custom-slider-button--prev',
        { 'slick-disabled': currentSlide === 0 },
      )}
      aria-hidden="true"
      aria-disabled={currentSlide === 0}
    />
  );
};

const SampleNextArrow = ({
  currentSlide, slideCount = 0, onClick, ...props
}: CustomArrowProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      type="button"
      className={classNames(
        'custom-slider-button',
        'custom-slider-button--next',
        { 'slick-disabled': currentSlide === slideCount - 1 },
      )}
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1}
    />
  );
};

type Props = {
  carouselImagesUrl: string[];
};

export const InfiniteSlider: FC<Props> = ({ carouselImagesUrl }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 870,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {carouselImagesUrl.map(imageUrl => (
          <img key={imageUrl} src={imageUrl} alt="Images banner" />
        ))}
      </Slider>
    </div>
  );
};
