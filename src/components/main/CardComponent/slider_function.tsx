type NextSlideParams = {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  totalSlides: number;
};

export const nextSlide = ({
  currentSlide,
  setCurrentSlide,
  totalSlides,
}: NextSlideParams) => {
  const nextSlides = (currentSlide + 1) % totalSlides;

  setCurrentSlide(nextSlides);
};

export const previousSlide = ({
  currentSlide,
  setCurrentSlide,
  totalSlides,
}: NextSlideParams) => {
  const prevSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;

  setCurrentSlide(prevSlide);
};
