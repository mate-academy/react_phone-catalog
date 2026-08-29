import styles from './About.module.scss';
import { Description } from '../../../types/Gadget';

interface Props {
  description: Description[];
}

export const About: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.about}>
      <h3 className={styles.about__title}>About</h3>
      <ul className={styles.about__list}>
        {description.map(desc => {
          const { title, text } = desc;

          return (
            <li key={title}>
              <p className={styles.about__subtitle}>{title}</p>
              {text.map(a => {
                return (
                  <p className={styles.about__text} key={a}>
                    {a}
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
