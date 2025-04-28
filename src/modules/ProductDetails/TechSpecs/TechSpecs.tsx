import styles from './TechSpecs.module.scss';

interface Props {
  techSpecs: {
    title: string;
    value: string;
  }[];
}

export const TechSpecs: React.FC<Props> = ({ techSpecs }) => {
  return (
    <div className={styles['tech-specs']}>
      <h3 className={styles['tech-specs__title']}>Tech Specs</h3>

      <ul className={styles['tech-specs__list']}>
        {techSpecs.map(specs => {
          const { title, value } = specs;

          return (
            <li className={styles['tech-specs__item']} key={title}>
              <p className={styles['tech-specs__term']}>{title}</p>
              <p className={styles['tech-specs__desc']}>
                {Array.isArray(value) ? value.join(', ') : value}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
