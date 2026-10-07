import styles from './ProductAbout.module.scss';

type ProductDescription = {
  title: string;
  text: string[];
};

type ProductAboutProps = {
  description: ProductDescription[];
};
export const ProductAbout = ({ description }: ProductAboutProps) => {
  return (
    <section className={styles.product_about}>
      <h3 className={styles.product_about__title}>About</h3>

      {description.map(section => (
        <div className={styles.product_about__container} key={section.title}>
          <h4 className={styles.product_about__container__title}>
            {section.title}
          </h4>

          {section.text.map(text => (
            <p className={styles.product_about__container__text} key={text}>
              {text}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
};
