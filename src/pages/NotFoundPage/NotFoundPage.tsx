import { GoBackButton } from '@/components/GoBackButton';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <div className="NotFoundPage__back">
        <GoBackButton />
      </div>

      <div className="NotFoundPage__title">
        <h1>
          Page not found...
        </h1>
      </div>
    </div>
  );
};
