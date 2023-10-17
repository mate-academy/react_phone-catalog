import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

type Props = {
  title: string,
};

export const NotFoundPage: React.FC<Props> = ({ title }) => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">{title}</h1>
        <div className="not-found__img" />
      </div>

      <div className="not-found__back-btn">
        <Link className="not-found__back-btn-link" to="/">
          GO TO HOME PAGE
        </Link>
      </div>
    </div>
  );
};
