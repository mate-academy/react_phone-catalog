import './SketelCardPage.scss';

export const SkeletCardPage = () => {
  return (
    <div className="skelet skelet__item">
      <div className="skelet__item--info"></div>
      <div className="skelet__item--count"></div>
    </div>
  );
};

export const SkeletCardTotalItems = () => {
  return (
    <div className="skelet skelet__checkout">
      <div className="skelet__checkout--text"></div>
      <div className="skelet__checkout--button"></div>
    </div>
  );
};
