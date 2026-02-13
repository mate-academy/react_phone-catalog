import style from './About.module.scss';
import { Description } from './../../types/Gadget';

interface Props {
  description: Description[];
}

export const About: React.FC<Props> = ({ description }) => {
  return (
    <div className={style.about}>
      <h3 className={style.about__title}>About</h3>
      <ul className={style.about__list}>
        {description.map(desc => {
          const { title, text } = desc;

          return (
            <li key={title}>
              <p className={style.about__subtitle}>{title}</p>
              {text.map(a => {
                return (
                  <p className={style.about__text} key={a}>
                    {a}
                  </p>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
