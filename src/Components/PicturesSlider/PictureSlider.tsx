import './PictureSlider.scss';

export const PictureSlider = () => {
  return (
    <>
      <div className="slider">
        <button className="slider__button slider__button-left">&lt;</button>
        <div className="slider__pictures"></div>
        <button className="slider__button slider__button-right">&gt;</button>
      </div>
    </>
  );
};
