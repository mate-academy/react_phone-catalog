/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FC, ReactNode, useEffect, useState,
} from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { throttle } from 'src/utils/throttle';

const PrevArrowIcon = (props: {
  disabled: boolean,
  onClick: (e: any) => void,
}) => {
  const disabled = props.disabled ? 'arrow--disabled-prev arrow--disabled' : '';

  return (
    <div className="arrow-wrapper">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
        className={`arrow-svg arrow__prev ${disabled}`}
      >
        <rect x="0.5" y="0.5" width="31" height="31" stroke="#B4BDC4" />

        {disabled
          ? (
            <path fillRule="evenodd" clipRule="evenodd" d="M18.4714 11.5286C18.211 11.2683 17.7889 11.2683 17.5286 11.5286L13.5286 15.5286C13.2682 15.789 13.2682 16.2111 13.5286 16.4714L17.5286 20.4714C17.7889 20.7318 18.211 20.7318 18.4714 20.4714C18.7317 20.2111 18.7317 19.789 18.4714 19.5286L14.9428 16L18.4714 12.4714C18.7317 12.2111 18.7317 11.789 18.4714 11.5286Z" fill="#B4BDC4" />
          ) : (
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5286 11.5286C13.789 11.2683 14.2111 11.2683 14.4714 11.5286L18.4714 15.5286C18.7318 15.789 18.7318 16.2111 18.4714 16.4714L14.4714 20.4714C14.2111 20.7318 13.789 20.7318 13.5286 20.4714C13.2683 20.2111 13.2683 19.789 13.5286 19.5286L17.0572 16L13.5286 12.4714C13.2683 12.2111 13.2683 11.789 13.5286 11.5286Z" fill="#313237" />
          )}
      </svg>
    </div>
  );
};

const NextArrowIcon = (props: {
  disabled: boolean,
  onClick: (e: any) => void,
}) => {
  const disabled = props.disabled ? 'arrow--disabled arrow--disabled-next' : '';

  return (
    <div className="arrow-wrapper">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
        className={`arrow-svg arrow__next ${disabled}`}
      >
        <rect x="0.5" y="0.5" width="31" height="31" stroke="#B4BDC4" />
        {disabled
          ? (
            <path fillRule="evenodd" clipRule="evenodd" d="M18.4714 11.5286C18.211 11.2683 17.7889 11.2683 17.5286 11.5286L13.5286 15.5286C13.2682 15.789 13.2682 16.2111 13.5286 16.4714L17.5286 20.4714C17.7889 20.7318 18.211 20.7318 18.4714 20.4714C18.7317 20.2111 18.7317 19.789 18.4714 19.5286L14.9428 16L18.4714 12.4714C18.7317 12.2111 18.7317 11.789 18.4714 11.5286Z" fill="#B4BDC4" />
          ) : (
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5286 11.5286C13.789 11.2683 14.2111 11.2683 14.4714 11.5286L18.4714 15.5286C18.7318 15.789 18.7318 16.2111 18.4714 16.4714L14.4714 20.4714C14.2111 20.7318 13.789 20.7318 13.5286 20.4714C13.2683 20.2111 13.2683 19.789 13.5286 19.5286L17.0572 16L13.5286 12.4714C13.2683 12.2111 13.2683 11.789 13.5286 11.5286Z" fill="#313237" />
          )}
      </svg>
    </div>
  );
};

type Props = {
  children: ReactNode,
};

function getWindowSize() {
  const { innerWidth, innerHeight } = window;

  return { innerWidth, innerHeight };
}

export const KeenSlider: FC<Props> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [slidesPerView, setSlidesPerView] = useState(4);

  const handleWindowResize = () => {
    setWindowSize(getWindowSize());
  };

  const handleWindowThrottling = throttle(handleWindowResize, 250);

  useEffect(() => {
    window.addEventListener('resize', handleWindowThrottling);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.innerWidth >= 1250) {
      setSlidesPerView(4);
    }

    if (windowSize.innerWidth < 1250) {
      setSlidesPerView(3);
    }

    if (windowSize.innerWidth < 900) {
      setSlidesPerView(2);
    }
  }, [windowSize.innerWidth]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    loop: true,
    slides: {
      perView: slidesPerView,
      origin: 0,
      spacing: 14,
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div
        ref={sliderRef}
        className="keen-slider"
      >
        {children}
      </div>
      {loaded && instanceRef.current && (
        <>
          <PrevArrowIcon
            onClick={(e: any) => e.stopPropagation()
    || instanceRef.current?.moveToIdx(currentSlide - slidesPerView, true)}
            disabled={currentSlide === 0}
          />

          <NextArrowIcon
            onClick={e => e.stopPropagation()
          || instanceRef.current?.moveToIdx(currentSlide + slidesPerView, true)}
            disabled={
              currentSlide === instanceRef
                .current.track.details.slides.length - slidesPerView
            }
          />
        </>
      )}
    </>
  );
};
