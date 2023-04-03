import { BackButton } from '../../components/BackButton';
import './style.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title title title--large">
        Page not found
      </h1>
      <BackButton />
    </div>
  );
};
