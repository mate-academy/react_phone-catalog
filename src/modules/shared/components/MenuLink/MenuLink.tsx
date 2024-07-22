import classNames from 'classnames';
import styles from './MenuLink.module.scss';
import { Device } from '../../types/types';

type Props = {
  device: Device;
  src: string;
  alt: string;
  className?: string;
};

export const MenuLink: React.FC<Props> = ({ device, src, alt, className }) => {
  return (
    <a
      className={classNames(
        styles.MenuLink,
        device === Device.Mobile
          ? styles.MenuLink_device_mobile
          : styles.MenuLink_device_notMobile,
        styles.MenuLink_active,
        className,
      )}
      href="#"
    >
      <img className={styles.Icon} src={src} alt={alt}></img>
    </a>
  );
};
