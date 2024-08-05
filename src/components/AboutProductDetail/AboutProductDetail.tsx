import { Description } from '../../types/Description';

import styles from './AboutProductDetail.module.scss';

type Props = {
  description: Description[] | undefined;
};

export const AboutProductDetail: React.FC<Props> = ({ description }) => {
  return (
    <article className={styles.About}>
      <p className={styles.AboutTitle}>About</p>

      <div className={styles.AboutContent}>
        {description?.length &&
          description.map(({ title, text }) => (
            <ul key={title} className={styles.AboutList}>
              <li className={styles.AboutListTitle}>{title}</li>

              {text.map(item => (
                <li key={item} className={styles.AboutListSubtitle}>
                  {item}
                </li>
              ))}
            </ul>
          ))}
      </div>
    </article>
  );
};
