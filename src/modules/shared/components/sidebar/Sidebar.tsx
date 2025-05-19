import { ListOfIconLinks } from '../listOfIconLinks';
import { ListOfTextLinks } from '../listOfTextLinks';
import styles from './Sidebar.module.scss';

export const Saidebar: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ListOfTextLinks direction={'column'} />
        <ListOfIconLinks parentComponent={'saidebar'} />
      </nav>
    </aside>
  );
};
