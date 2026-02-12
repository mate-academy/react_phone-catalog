import { forwardRef, useEffect } from 'react';
import { ListOfIconLinks } from '../listOfIconLinks';
import { ListOfTextLinks } from '../listOfTextLinks';
import styles from './Sidebar.module.scss';

type SidebarProps = React.HTMLAttributes<HTMLElement>;

export const Sidebar = forwardRef<HTMLElement, SidebarProps>((props, ref) => {
  useEffect(() => {
    const body = document.querySelector('body');

    if (!body) {
      return;
    }

    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = '';
    };
  }, []);

  return (
    <aside ref={ref} {...props} className={styles.aside}>
      <nav className={styles.nav}>
        <ListOfTextLinks direction={'column'} />
        <ListOfIconLinks parentComponent={'saidebar'} />
      </nav>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
