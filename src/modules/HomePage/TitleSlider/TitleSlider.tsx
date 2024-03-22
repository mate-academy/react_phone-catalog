export const TitleSlider = () => {
  return (
    <div className="title-slider">
      <img
        src="/img/slider-1.png"
        alt="IPhone 14 Pro"
        className="title-slider__img"
      />
      <div className="title-slider__lines">
        <span className="title-slider__line title-slider__line--active" />
        <span className="title-slider__line" />
        <span className="title-slider__line" />
      </div>
    </div>
  );
};
