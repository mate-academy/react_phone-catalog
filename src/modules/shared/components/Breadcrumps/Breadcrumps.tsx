import { asset } from '../../utils/asset';
import styles from './Breadcrumps.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  type?: string;
  name?: string;
};

export default function Breadcrumps({ type, name = '' }: Props) {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.link}>
        <img
          src={asset('img/icons/home.png')}
          alt="Home"
          className={styles.icon}
        />
      </Link>
      <img
        src={asset('img/icons/arrow-right.png')}
        alt="Breadcrumbs Separator"
        className={styles.icon}
      />
      {name ? (
        <>
          <Link to={`/${type}`} className={styles.link}>
            <p className={styles.text}>{type}</p>
          </Link>
          <img
            src={asset('img/icons/arrow-right.png')}
            alt="Breadcrumbs Separator"
            className={styles.icon}
          />
          <p className={styles.text}>{name}</p>
        </>
      ) : (
        <p className={styles.text}>{type}</p>
      )}
    </div>
  );
}
