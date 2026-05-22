import styles from './techSpecs.module.scss';
type Props = {
  objectTech?: Record<string, string> | null;
};
export const TechSpecs = ({ objectTech }: Props) => {
  return objectTech ? (
    <div className={styles.tech}>
      <h3 className={styles.tech__title}>Tech specs</h3>
      {Object.entries(objectTech).map(([key, value]) => (
        <div key={key} className={styles.tech__box}>
          <span className={styles.tech__name}>{key}</span>
          <span className={styles.tech__description}>{value}</span>
        </div>
      ))}
    </div>
  ) : null;
};
