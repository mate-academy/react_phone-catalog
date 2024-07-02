import './backToTopButton.scss';
import Arrow from '../../images/icons/arrow_right_small.svg';

export const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button type="button" className="backToTopButton" onClick={scrollToTop}>
      <p className="backToTopButton__text">Back to top</p>
      <div className="backToTopButton__imgContainer">
        <img src={Arrow} alt="arrow btn" className="backToTopButton__img" />
      </div>
    </button>
  );
};
