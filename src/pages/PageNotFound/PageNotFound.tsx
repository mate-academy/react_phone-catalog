import { BackButton } from '../../components/BackButton/BackButton';
import './PageNotFound.scss';

export const PageNotFound: React.FC = () => (
  <div className="not-found">
    <BackButton />

    <h1 className="not-found__title">
      Page not found!
    </h1>
  </div>
);
