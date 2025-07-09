import { Link } from 'react-router-dom';
import styles from './footer-buttons.module.scss';
import btn from '@shared/styles/regularButton.module.scss';
import { AriaNames, IconPath } from '@shared/types/ButtonProps';
import { Button } from '@shared/ui/button';

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const buttonCN = {
  main: btn.button,
  icon: btn.button__icon,
};

export const FooterButtons: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link to={'#top'}>Back to top</Link>
      <Button
        ariaName={AriaNames.Top}
        iconPath={IconPath.Up}
        className={buttonCN}
        fn={goToTop}
      />
    </div>
  );
};
