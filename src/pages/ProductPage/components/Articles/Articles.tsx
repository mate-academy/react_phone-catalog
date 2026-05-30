//styles
import styles from './Articles.module.scss';

//services
import classNames from 'classnames';

type Props = {
  description: { title: string; text: string[] }[];
  className?: string;
};

export const Articles: React.FC<Props> = ({ description, className }) => {
  return (
    <div className={classNames(styles.articles, className)}>
      {description.map((el, index) => (
        <article key={index} className={styles.article}>
          <h4 className={styles.title}>{el.title}</h4>

          <div className={styles.text}>
            {el.text.map(p => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};
