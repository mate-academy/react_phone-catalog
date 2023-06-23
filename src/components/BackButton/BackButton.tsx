import leftArrow from '../../assets/svg/l_arrow.svg';
import './BackButton.scss';

export const BackButton = () => {
  return (
    <button className="back-button" onClick={() => window.history.back()} type="button">
      <img className="back-button__icon" src={leftArrow} alt="go back button" />
      Back
    </button>
  );
};
