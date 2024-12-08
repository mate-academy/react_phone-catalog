import './BackButton.scss';

export const BackButton = () => {
  return (
    <div className="back-button">
      <img src="/icons/arrow_left.svg" alt="Arrow left" />
      <p className="back-button__text small-text">Back</p>
    </div>
  );
};
