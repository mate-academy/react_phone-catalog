import { TechSpecsExtended, techSpecUIExtended } from '../../model';
import styles from '../../styles/articleSection.module.scss';

type Props = {
  description: { title: string; text: string[] }[];
  specs: TechSpecsExtended;
};

export const ArticleSection = ({ description, specs }: Props) => {
  return (
    <section className={styles.articleSection}>
      <article className={styles.article}>
        <h2 className={styles.heading}>about</h2>
        {description.map((el, index) => (
          <>
            <h3 key={index} className={styles.article__headline}>
              {el.title}
            </h3>
            {el.text.map((text, id) => (
              <p key={id} className={styles.article__text}>
                {text}
              </p>
            ))}
          </>
        ))}
      </article>
      <article className={styles['tech-specs']}>
        <h2 className={styles.heading}>tech specs</h2>
        <dl className={styles['tech-specs__table']}>
          {Object.entries(specs).map(([key, value]) => {
            const typedKey = key as keyof typeof techSpecUIExtended;
            const val = Array.isArray(value) ? value.join(', ') : value;

            return (
              <div key={key} className={styles['tech-specs__tcontainer']}>
                <dt className={styles['tech-specs__key']}>
                  {techSpecUIExtended[typedKey]}
                </dt>
                <dd className={styles['tech-specs__value']}>{val}</dd>
              </div>
            );
          })}
        </dl>
      </article>
    </section>
  );
};
