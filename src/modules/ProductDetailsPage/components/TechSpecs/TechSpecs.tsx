import styles from './TechSpecs.module.scss';

type TechSpec = {
  title: string;
  value: string;
};

type TechSpecsProps = {
  specs: TechSpec[];
};

export const TechSpecs = ({ specs }: TechSpecsProps) => {
  return (
    <section className={styles.product_techSpecs}>
      <h3 className={styles.product_techSpecs__title}>Tech specs</h3>

      {specs.map(spec => (
        <div className={styles.product_techSpecs__container} key={spec.title}>
          <h4 className={styles.product_techSpecs__container__title}>
            {spec.title}
          </h4>
          <p className={styles.product_techSpecs__container__text}>
            {spec.value}
          </p>
        </div>
      ))}
    </section>
  );
};
