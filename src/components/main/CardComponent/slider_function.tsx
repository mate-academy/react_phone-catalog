type NextSlideParams = {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  totalSlides: number;
};

type PrevSlide = {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
};

export const nextSlide = ({
  currentSlide,
  setCurrentSlide,
  totalSlides,
}: NextSlideParams) => {
  const nextSlides = (currentSlide + 1) % totalSlides;

  setCurrentSlide(nextSlides);
};

export const previousSlide = ({ currentSlide, setCurrentSlide }: PrevSlide) => {
  const prevSlides = currentSlide === 0 ? 0 : currentSlide - 1;

  setCurrentSlide(prevSlides);
};
