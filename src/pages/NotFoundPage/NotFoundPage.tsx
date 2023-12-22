import './notFoundPage.scss';

type Props = {
  title: string;
};

export const NotFoundPage: React.FC<Props> = ({ title }) => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__text">{title}</h1>
      <div className="not-found-page__smile">
        <img
          className="not-found-page__smile-image"
          src="img/utils/smile.png"
          alt="smile-sad"
        />
      </div>
    </div>
  );
};
