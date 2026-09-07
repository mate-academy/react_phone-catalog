import classNames from 'classnames';
import { DescriptionItem } from '../../../../types/Descriprion';
import styles from './About.module.scss';

type Props = {
  description: DescriptionItem[];
};

export const About: React.FC<Props> = ({ description }) => {
  return (
    <div className={classNames(styles.about)}>
      <h3 className={classNames(styles.about__title)}>About</h3>
      <article className={classNames(styles.about__text)}>
        {description.map((d, i) => (
          <div key={i} className={classNames(styles.about__item)}>
            <h4 className={classNames(styles.about__subtitle)}>{d.title}</h4>
            <div className={classNames(styles.about__textblock)}>
              {d.text.map((t, j) => (
                <p key={j} className={classNames(styles.about__paragraph)}>
                  {t}
                </p>
              ))}
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};
