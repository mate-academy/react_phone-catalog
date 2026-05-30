import styles from './About.module.scss';

import { Phone } from '../../types/Phone';
import { Accessoirs } from '../../types/Accesories';
import { Tables } from '../../types/Tablets';
import Skeleton from 'react-loading-skeleton';

interface Props {
  card: Phone | Accessoirs | Tables | null | undefined;
}

export const About: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.about}>
      <h3 className={styles.about__title}>About</h3>
      <hr />
      <div className={styles.about__description}>
        {card &&
          card.description.map(obj => (
            <div className={styles.about__section} key={obj.title}>
              <h4>{obj.title}</h4>
              <div className={styles.about__texts}>
                {obj.text.map((a, i) => (
                  <span key={i} className={styles.about__text}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        {!card && (
          <div className={styles.about__section}>
            <h4>
              <Skeleton />
            </h4>
            <div className={styles.about__texts}>
              <span className={styles.about__text}>
                <Skeleton className={styles.about__textSkeleton} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
