import { ReactSVG } from 'react-svg';
import './loadingeror.scss';

export const LoadingError: React.FC = () => {
  return (
    <div className="loading-error">
      <div className="loading-error__heading">
        <div className="loading-error__icon">
          <ReactSVG src="img/icons/Warning.svg" />
        </div>

        <h2 className="loading-error__title">Couldn&apos;t load products...</h2>
      </div>

      <p className="loading-error__description">
        Please, check your internet connection or contact us to fix your problem
      </p>
    </div>
  );
};
