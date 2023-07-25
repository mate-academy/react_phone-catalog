import { ErrorType } from '../../types/Error';
import './NotFound.scss';

type Props = {
  error: ErrorType,
};

export const NotFound: React.FC<Props> = ({ error }) => {
  return (
    <div className="
      not-found
      grid__item--desktop-1-24"
    >
      <span className="not-found__image" />

      <h1 className="not-found__text">
        {error}
      </h1>
    </div>
  );
};
