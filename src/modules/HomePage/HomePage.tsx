import styles from './HomePage.module.scss';
import { useMyContext } from '../../Contexts.tsx/ProductContexts';
import { MainContent } from '../MainContent';
import { BurgerMenu } from '../../shared/BurgerMenu';

export const HomePage: React.FC = () => {
  const { isMenuOpen } = useMyContext();

  return (
    <div className={styles.homePage_container}>
      {isMenuOpen ? <BurgerMenu /> : <MainContent />}
    </div>
  );
};
