import { Link } from 'react-router-dom';
import './logo.scss';
import classNames from 'classnames';

type Props = {
  parentClass?: string;
};

export const Logo: React.FC<Props> = ({ parentClass }) => {
  return (
    <div
      className={classNames(
        parentClass,
        'logo',
      )}
    >
      <Link
        to="/"
        className="logo__link"
      >
        <img
          src="./img/icons/Logo.png"
          alt="Logo"
          className="logo__img"
        />
      </Link>
    </div>
  );
};
