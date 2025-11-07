import { IconLinks } from '../IconLinks/IconLinks';
import { Navigation } from '../Navigation/Navigation';
import styles from './MobileMenu.module.scss';

type Props = {
  setIsMenuOpen: (value: boolean) => void;
};

export const MobileMenu: React.FC<Props> = ({ setIsMenuOpen }) => {
  return (
    <div className={styles.mobileMenu}>
      <Navigation className="mobileNav" setIsMenuOpen={setIsMenuOpen} />
      <IconLinks
        mainClass={['mobileLinks']}
        linkClass={['mobileLink']}
        iconClass={['mobileIcon']}
      />
    </div>
  );
};
