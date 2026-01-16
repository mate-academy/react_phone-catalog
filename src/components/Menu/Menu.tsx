import styles from './Menu.module.scss';
import MenuNav from './MenuNav/index';

export const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <MenuNav />
    </div>
  );
};
