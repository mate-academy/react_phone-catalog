import './not-found-page.scss';

type Props = {
  title: string,
};

export const NotFoundPage: React.FC<Props> = ({ title }) => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">{title}</h1>
    </div>
  );
};
