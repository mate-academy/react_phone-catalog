import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Icon.module.scss';
import { IconType } from '../../types/IconType';

interface Props {
  iconType: IconType;
  address: string;
  contentCart?: number | 0;
  contentFav?: number | 0;
}

export const Icon = ({ iconType, address, contentCart, contentFav }: Props) => {
  const navigate = useNavigate();

  if (iconType === 'menu') {
    return (
      <a
        href={address}
        className={`${styles.icon} ${styles[`icon--${iconType}`]}`}
      ></a>
    );
  }

  if (iconType === 'close') {
    return (
      <NavLink
        to={address}
        replace
        className={`${styles.icon} ${styles[`icon--${iconType}`]}`}
        onClick={e => {
          e.preventDefault();
          navigate(-1);
        }}
      ></NavLink>
    );
  }

  if (iconType === 'cart') {
    return (
      <NavLink
        to={address}
        className={`${styles.icon} ${styles[`icon--${iconType}`]}
        }`}
      >
        {contentCart && contentCart > 0 && (
          <span className={styles.icon__badge}>{contentCart}</span>
        )}
      </NavLink>
    );
  }

  if (iconType === 'like') {
    return (
      <NavLink
        to={address}
        className={`${styles.icon} ${styles[`icon--${iconType}`]}
        }`}
      >
        {contentFav && contentFav > 0 ? (
          <span className={styles.icon__badge}>{contentFav}</span>
        ) : (
          <span></span>
        )}
      </NavLink>
    );
  } else {
    return (
      <NavLink
        to={address}
        className={`${styles.icon} ${styles[`icon--${iconType}`]}
        }`}
      ></NavLink>
    );
  }
};
