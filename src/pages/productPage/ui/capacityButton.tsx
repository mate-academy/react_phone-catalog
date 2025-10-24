import { Capacity } from '@shared/types';
import styles from '../styles/optionCapacityButton.module.scss';
import { useNavigationTracker } from '@features/index';
import { CapacityButtonConfig } from '../model';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { LoadStatus } from '@shared/api';

type Props = {
  to: string;
  value: Capacity;
  active: boolean;
};

const baseConfig: CapacityButtonConfig = {
  to: '/',
  className: styles['capacity-btn'],
  'aria-label': '',
  onClick: (e: React.MouseEvent) => e.preventDefault(),
};

export const CapacityButton = ({ data }: { data: Props | LoadStatus }) => {
  const { preserveFrom } = useNavigationTracker();

  const text = typeof data === 'string' ? '----GB' : data.value;

  const getConfig = (): CapacityButtonConfig => {
    if (typeof data === 'string') {
      return baseConfig;
    }

    const { to, value, active } = data;

    return {
      to,
      className: classNames(styles['capacity-btn'], {
        [styles['capacity-btn-is-active']]: active,
      }),
      'aria-label': `Select ${value} model`,
      ...(active && { 'aria-current': 'page' }),
      onClick: (e: React.MouseEvent) => preserveFrom(e, to),
    };
  };

  return <Link {...getConfig()}>{text}</Link>;
};
