/* eslint-disable jsx-a11y/control-has-associated-label */
import './Banner.scss';

export const Slider = () => {
  return (
    <div className="main__banner banner-container">
      <div className="banner-container__slider slider">
        <button
          className="slider__button slider__button--left"
          type="button"
        />
        <div className="slider__banner">
          <img
            src="img/banner/banner.jpg"
            alt="photo1"
            className="slider__banner-img"
          />
        </div>
        <button
          className="slider__button slider__button--right"
          type="button"
        />
      </div>
      <div className="banner-container__pagination pagination">
        <span className="pagination__part pagination__part--active" />
        <span className="pagination__part" />
        <span className="pagination__part" />
      </div>
    </div>
  );
};
