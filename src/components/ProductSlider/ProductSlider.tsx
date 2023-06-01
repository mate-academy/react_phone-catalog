import './ProductSlider.scss';

type ProductSliderProps = {
  page: number;
  width: number;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  page,
  width,
  children,
}) => (
  <div className="slider" style={{ maxWidth: width }}>
    <div
      className="slider__wrapper"
      style={{ transform: `translateX(${-100 * page}%)` }}
      data-cy="cardsContainer"
    >
      {children}
    </div>
  </div>
);
