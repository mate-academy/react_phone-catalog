import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';

import { Icon } from '../icon/Icon';
import { AppRoutes, IconNames } from '../../enums';
import { isProductDetailPath } from '../../helpers';

type Props = {
  className?: string;
};

export const Back: React.FC<Props> = ({ className }) => {
  const { state, pathname } = useLocation();

  let backPath: string = AppRoutes.ROOT;

  if (state) {
    backPath = `${state.pathname}${state.search || ''}`;

    if (isProductDetailPath(state.pathname) && pathname !== AppRoutes.CART) {
      const pathParts = state.pathname.split('/');

      backPath = `/${pathParts[1]}`;
    }
  }

  return (
    <Link
      data-cy="backButton"
      to={backPath}
      className={classNames(className, 'back')}
      state={{ pathname }}
    >
      <Icon icon={IconNames.ARROW} options={{ rotate: 180 }} />
      Back
    </Link>
  );
};
