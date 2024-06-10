export const HeaderMenuButtons = () => {
  const handleBack = () => {
    history.back();
  };

  return (
    <div className="header__buttons">
      <div
        onClick={handleBack}
        className="header__button header__button-close"
      ></div>
    </div>
  );
};
