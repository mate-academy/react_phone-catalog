import './BackLink.scss';

export const BackLink: React.FC = () => {
  return (
    <button onClick={() => history.back()} className="back-link">
      <div className="back-link__image-wrapper">
        <img
          className="back-link__image breadcrumbs__back-link"
          src="./icons/arrow-left.svg"
          alt="left arrow icon"
        />
      </div>
      <p className="back-link__text">Back</p>
    </button>
  );
};
