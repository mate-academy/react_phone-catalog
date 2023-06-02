import './ProductSlider.scss';

type ProductSliderProps = {
  page: number;
  width: number;
  height: number;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  page, width, height, children,
}) => {
  const slideSize = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div
      className="slider"
      style={slideSize}
    >
      <ul className="slider__list" style={{ transform: `translateX(${-100 * page}%)` }}>
        {/* {children} */}
        {Array.isArray(children) && children.map(child => (
          <li className="slider__item" key={child.key}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};
