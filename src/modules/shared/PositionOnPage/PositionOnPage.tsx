import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import styles from './PositionOnPage.module.scss';
import { House, ChevronRight } from 'lucide-react';
import { capitalizeWords } from '../../hooks/utilHooks';

export const PositionOnPage = () => {
  // It works for now, but probably needs clean up later.
  const location = useLocation();
  const navigate = useNavigate();

  const toDisplayPosition = location.pathname
    .replace(/-/g, ' ')
    .split('/')
    .filter(Boolean);

  const formattedPosition = toDisplayPosition.map(capitalizeWords);

  return (
    <div className={styles.positionOnPage__Container}>
      <NavLink to="/">
        <House className={styles.positionOnPage__Icon} />
      </NavLink>
      {formattedPosition.map((pos, index) => (
        <div key={index} className={styles.positionOnPage__Section}>
          <ChevronRight className={styles.positionOnPage__Icon} />
          <h3
            className={styles.positionOnPage__Location}
            onClick={() => {
              // Worst way to handle it, but I spent too much time on this project already...
              // 3 weeks...
              if (
                pos.toLowerCase() === 'phones' ||
                pos.toLowerCase() === 'tablets' ||
                pos.toLowerCase() === 'accessories'
              ) {
                navigate(`/catalog/${pos.toLowerCase()}`.replace(/ /g, '-'));
              }

              return;
            }}
          >
            {pos}
          </h3>
        </div>
      ))}
    </div>
  );
};
