import cn from 'classnames';
import styles from './TechSpecs.module.scss';

interface Props {
  className?: string;
  techSpecs: {
    title: string;
    value: string;
  }[];
}

export const TechSpecs: React.FC<Props> = ({ techSpecs, className }) => {
  return (
    <div className={cn(styles['tech-specs'], className)}>
      <h3 className={styles['tech-specs__title']}>Tech specs</h3>

      <ul className={styles['tech-specs__list']}>
        {techSpecs.map(spec => {
          const { title, value } = spec;

          return (
            <li className={styles['tech-specs__item']} key={title}>
              <dt className={styles['tech-specs__term']}>{title}</dt>
              <dd className={styles['tech-specs__desc']}>{value}</dd>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
