import { useTheme } from '../../contexts/ThemeContext';
import styles from './SectionBreadcrumbs.module.scss';

type Props = {
  currentLink: string;
};

export const SectionBreadcrumbs: React.FC<Props> = ({ currentLink }) => {
  const { theme } = useTheme();

  return (
    <div className={styles.sectionBreadcrumbs}>
      <a
        href="#"
        className={`${styles.sectionBreadcrumbs__linkHome} ${theme === 'light' && styles['sectionBreadcrumbs__linkHome--lightTheme']}`}
      ></a>
      <a
        href=""
        className={`${styles.sectionBreadcrumbs__arrowRight} ${theme === 'light' && styles['sectionBreadcrumbs__arrowRight--lightTheme']}`}
      ></a>
      <a
        href=""
        className={`${styles.sectionBreadcrumbs__currentLink} ${theme === 'light' && styles['sectionBreadcrumbs__currentLink--lightTheme']}`}
      >
        {currentLink}
      </a>
    </div>
  );
};
