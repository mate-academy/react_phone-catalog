import Chevron from '../../../public/img/icons/Chevron (Arrow Right).svg';

export const GoBack = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="go-back" onClick={handleBack}>
      <img className="go-back_arrow" src={Chevron} alt="arrow" />
      <p className="go-back_text">Back</p>
    </div>
  );
};
