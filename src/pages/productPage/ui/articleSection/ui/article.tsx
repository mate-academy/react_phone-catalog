import shared from '../../../styles/articleSection/shared.module.scss';
import styles from '../../../styles/articleSection/article.module.scss';

type Props = {
  description: { title: string; text: string[] }[];
};

export const Article = ({ description }: Props) => {
  return (
    <section
      className={shared['article-section-container']}
      aria-labelledby="about-heading"
    >
      <h2 className={shared.heading} id="about-heading">
        about
      </h2>
      {description.map((el, index) => (
        <div key={index} className={styles['inner-container']}>
          <h3 className={shared.headline}>{el.title}</h3>
          {el.text.map((text, id) => (
            <p key={id} className={shared['main-text']}>
              {text}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
};
