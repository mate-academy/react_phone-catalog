import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';

import { Icon } from '../icon/Icon';
import { IconNames } from '../../enums';

type Props = {
  className?: string;
};

export const Back: React.FC<Props> = ({ className }) => {
  const { state, pathname } = useLocation();

  const backPath = state ? `${state.pathname}${state.search || ''}` : '..';

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
