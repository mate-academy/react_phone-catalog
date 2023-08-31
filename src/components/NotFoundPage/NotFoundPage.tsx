import './NotFoundPage.scss';

type Props = {
  title: string,
};

export const NotFoundPage: React.FC<Props> = ({ title }) => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">{title}</h1>
    </div>
  );
};
