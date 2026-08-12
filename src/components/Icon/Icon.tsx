import styles from './Icon.module.scss';
import { icons, type IconName } from './icons';

type Props = {
  name: IconName;
  size?: 16 | 24 | 32;
  className?: string;
};

export const Icon = ({ name, size = 16, className = '' }: Props) => {
  const SvgIcon = icons[name];

  const iconClassName = [styles.icon, className].filter(Boolean).join(' ');

  return (
    <SvgIcon
      className={iconClassName}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    />
  );
};
