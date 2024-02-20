import './Loader.scss';

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-container__logo">Loading</div>
      <div className="loader-container__dot loader-container__dot--first" />
      <div className="loader-container__dot loader-container__dot--second" />
      <div className="loader-container__dot loader-container__dot--third" />
    </div>
  );
};
