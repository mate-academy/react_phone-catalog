import { SlideImage } from './components/SlideImage';
import { SliderNavigationButton } from './components/SliderNavigationButton';
import { SliderPagination } from './components/SliderPagination';
import { useSlider } from './hooks/useSlider';
import { BANNERS } from './constants/banners';

export const MainSlider = () => {
  const {
    currentSlideIndex,
    handleGoToSlide,
    handleNextSlide,
    handlePreviousSlide,
  } = useSlider();

  return (
    <section className="cursor-pointer flex flex-col items-center w-full lg:max-w-[1136px] lg:mx-auto md:mt-[40px] lg:mt-[80px]">
      <div className="flex items-center w-full h-[320px] md:h-[368px] lg:h-[432px]">
        <SliderNavigationButton
          direction="previous"
          onClick={handlePreviousSlide}
        />

        <div className="relative flex-grow h-full mx-0 md:mx-4 overflow-hidden">
          {BANNERS.map((banner, index) => (
            <SlideImage
              key={banner.id}
              images={banner.images}
              alt={banner.alt}
              isActive={index === currentSlideIndex}
            />
          ))}
          <div className="absolute inset-0 bg-black/50 min-[640px]:rounded-[24px] z-30 pointer-events-none" />
        </div>

        <SliderNavigationButton
          direction="next"
          onClick={handleNextSlide}
        />
      </div>

      <SliderPagination
        totalSlides={BANNERS.length}
        activeIndex={currentSlideIndex}
        onDotClick={handleGoToSlide}
      />
    </section>
  );
};
