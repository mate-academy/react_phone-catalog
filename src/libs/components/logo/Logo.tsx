import './styles.scss';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { LOGO_PATH } from '../icon/libs/icons';
import { AppRoutes } from '../../enums';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => (
  <Link
    to={AppRoutes.ROOT}
    className={classNames(className, 'logo')}
  >
    <img
      src={LOGO_PATH}
      alt="Phone Catalog Logo"
      className="logo__img"
    />
  </Link>
);
