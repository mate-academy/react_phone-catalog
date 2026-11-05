import classNames from 'classnames';

import styles from './Icon.module.scss';

type Props = {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
};

type IconStyle = React.CSSProperties & {
  '--icon'?: string;
};

export const Icon = ({ icon, className, style }: Props) => {
  const iconUrl = `url(${icon})`;

  const iconStyle: IconStyle = {
    '--icon': iconUrl,
    ...style,
  };

  return (
    <span
      className={classNames(styles.icon, className)}
      style={iconStyle}
      aria-hidden="true"
    />
  );
};
