import classNames from 'classnames';
import { LogoLink } from '../LogoLink';
import styles from './Footer.module.scss';
import { InfoLinks } from '../InfoLinks';
import { BackToTop } from '../BackToTop';

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={classNames(styles.Footer, className)}>
      <nav className={styles.Navigation}>
        <menu className={styles.Menu}>
          <li className={styles.MenuItem}>
            <LogoLink className={styles.LogoLink} />
          </li>

          <li className={styles.MenuItem}>
            <InfoLinks />
          </li>

          <li className={styles.MenuItem}>
            <BackToTop className={styles.BackToTop} />
          </li>
        </menu>
      </nav>
    </footer>
  );
};
