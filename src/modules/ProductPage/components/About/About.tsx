import cn from 'classnames';
import { Description } from '../../../../types/Gadget';

import styles from './About.module.scss';

interface Props {
  description: Description[];
  className?: string;
}

export const About: React.FC<Props> = ({ description, className }) => {
  return (
    <div className={cn(styles.about, className)}>
      <h3 className={styles.about__title}>About</h3>

      <ul className={styles.about__list}>
        {description.map(desc => {
          const { title, text } = desc;

          return (
            <li key={title}>
              <p className={styles.about__subtitle}>{title}</p>
              {text.map(t => {
                return (
                  <p className={styles.about__text} key={t}>
                    {t}
                  </p>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
