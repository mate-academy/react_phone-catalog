import { Link } from 'react-router-dom';
import { AppRoutes } from 'config';
import './Sorry.scss';

type Props = {
  type: string,
};

export const Sorry: React.FC<Props> = ({ type }) => {
  return (
    <div className="sorry">
      <h1 className="sorry__heading">Oops!</h1>
      <p className="sorry__info">
        {`Apologies for the inconvenience, but ${type} are not available yet!
        We appreciate your understanding.
        Maybe you want to go back to `}
        <Link
          to={AppRoutes.Root}
          className="sorry__link"
        >
          Home page.
        </Link>
      </p>
    </div>
  );
};
