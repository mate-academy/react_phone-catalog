import { ErrorType } from '../../types/Error';
import './ErrorNotification.scss';

type Props = {
  error: ErrorType,
};

export const ErrorNotification: React.FC<Props> = ({ error }) => (
  <h1 className="
    notification
    grid__item--desktop-1-24"
  >
    {`...${error}...`}
  </h1>
);
