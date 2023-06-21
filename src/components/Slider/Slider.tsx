import './Slider.scss';

type SliderProps = {
  slide: number;
  children?: React.ReactNode;
};

export const Slider = ({
  slide,
  children,
}: React.PropsWithChildren<SliderProps>) => (
  <div className="slider">
    <div
      className="slider__wrapper"
      style={{ transform: `translateX(${-100 * slide}%)` }}
      data-cy="cardsContainer"
    >
      {children}
    </div>
  </div>
);
