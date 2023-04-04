import { FC } from 'react';
import './InfiniteSlider.scss';
import Slider, { CustomArrowProps } from 'react-slick';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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

interface SliderImage {
  path: string,
  imageUrl: string,
}

type Props = {
  carouselImages: SliderImage[];
};

export const InfiniteSlider: FC<Props> = ({ carouselImages }) => {
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
        {carouselImages.map(image => (
          <Link
            to={image.path}
            key={image.imageUrl}
            className="infinite-slider-link"
          >
            <img
              src={image.imageUrl}
              alt="Images banner"
              className="infinite-slider-image"
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};
