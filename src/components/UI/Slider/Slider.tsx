import './Slider.scss';

type SliderProps = {
  slide: number;
  gap: number;
  children?: React.ReactNode;
};

export const Slider = ({
  slide,
  gap,
  children,
}: React.PropsWithChildren<SliderProps>) => (
  <div className="slider">
    <div
      className="slider__wrapper"
      style={{ transform: `translateX(${-100 * slide}%)`, gap }}
      data-cy="cardsContainer"
    >
      {children}
    </div>
  </div>
);
