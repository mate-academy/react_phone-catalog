import { Description } from '../../types/Description';

import styles from './AboutProductDetail.module.scss';

type Props = {
  description: Description[] | undefined;
};

export const AboutProductDetail: React.FC<Props> = ({ description }) => {
  return (
    <article className={styles.about}>
      <p className={styles.title}>About</p>

      <div className={styles.content}>
        {description?.length &&
          description.map(({ title, text }) => (
            <ul key={title} className={styles.list}>
              <li className={styles.text}>{title}</li>

              {text.map(item => (
                <li key={item} className={styles.subtitle}>
                  {item}
                </li>
              ))}
            </ul>
          ))}
      </div>
    </article>
  );
};
