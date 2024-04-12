import './backToTopButton.scss';
import Arrow from '../../images/icons/arrow_right_small.svg';

export const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="backToTopButton">
      <p className="backToTopButton__text">Back to top</p>
      <button
        type="button"
        className="backToTopButton__imgContainer"
        onClick={scrollToTop}
      >
        <img
          src={Arrow}
          alt="arrow btn"
          className="backToTopButton__img"
        />
      </button>
    </div>
  );
};
