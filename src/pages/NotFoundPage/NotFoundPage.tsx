import {
  ReturnHomeButton,
} from '../../components/ReturnHomeButton/ReturnHomeButton';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__container">
        <h1 className="not-found-page__title">Page was not found</h1>
        <ReturnHomeButton />
      </div>
    </div>
  );
};
