import { Link, useLocation } from 'react-router-dom';

import { useMemo } from 'react';
import './ErrorMessage.scss';

interface Props {
  message: string;
  reload?: boolean;
}

export const ErrorMessage: React.FC<Props> = ({ message, reload = false }) => {
  const location = useLocation();

  const linkTo = useMemo(() => (reload ? location.pathname : '/'), []);
  const buttonText = useMemo(() => (reload ? 'Reload' : 'Return Home'), []);

  return (
    <div className="error-message">
      <div className="error-message__container">
        <h1 className="error-message__title">{message}</h1>

        <Link className="error-message__button" to={linkTo}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
};
