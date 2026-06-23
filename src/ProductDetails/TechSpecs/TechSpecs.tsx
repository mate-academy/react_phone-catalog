import style from './TechSpecs.module.scss';

interface Props {
  techSpecs: {
    title: string;
    value: string;
  }[];
}

export const TechSpecs: React.FC<Props> = ({ techSpecs }) => {
  return (
    <div className={style['tech-specs']}>
      <h3 className={style['tech-specs__title']}>Tech Specs</h3>

      <ul className={style['tech-specs__list']}>
        {techSpecs.map(specs => {
          const { title, value } = specs;

          return (
            <li className={style['tech-specs__item']} key={title}>
              <p className={style['tech-specs__term']}>{title}</p>
              <p className={style['tech-specs__desc']}>
                {Array.isArray(value) ? value.join(', ') : value}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
