import { Link } from 'react-router-dom';
import styles from '../styles/optionColorButton.module.scss';
import { Colors } from '@shared/types';
import { ColorButtonConfig, ColorsToHex } from '../model';
import classNames from 'classnames';
import { Status, useNavigationTracker } from '@features/index';

type Props = {
  to: string;
  value: Colors;
  active: boolean;
};

const baseConfig: ColorButtonConfig = {
  to: '/',
  className: styles['color-btn'],
  style: { '--bgc': ColorsToHex[Colors.WHITE] } as React.CSSProperties,
  'aria-label': '',
  onClick: (e: React.MouseEvent) => e.preventDefault(),
};

export const ColorButton = ({ data }: { data: Props | Status }) => {
  const { preserveFrom } = useNavigationTracker();

  const getConfig = (): ColorButtonConfig => {
    if (typeof data === 'string') {
      return baseConfig;
    }

    const { to, value, active } = data;

    return {
      to,
      className: classNames(styles['color-btn'], {
        [styles['color-btn-is-active']]: active,
      }),
      style: { '--bgc': ColorsToHex[value] } as React.CSSProperties,
      'aria-label': `Select ${value} model`,
      ...(active && { 'aria-current': 'page' }),
      onClick: (e: React.MouseEvent) => preserveFrom(e, to),
    };
  };

  return <Link {...getConfig()} />;
};
