import { Error } from '../../types/Error';
import './ErrorNotification.scss';

type Props = {
  error: Error,
};

export const ErrorNotification: React.FC<Props> = ({ error }) => (
  <h1
    className="
      error-notification
      grid__item--tablet-1-12
      grid__item--desktop-1-24"
  >
    {`...${error}...`}
  </h1>
);
