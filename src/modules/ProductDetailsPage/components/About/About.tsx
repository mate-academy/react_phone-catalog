import type { ProductFullDescription } from 'types/ProductFullDescription';
import s from './About.module.scss';

type Props = {
  description: ProductFullDescription[];
};

export const About = ({ description }: Props) => {
  return (
    <div>
      <h3 className={s.about__title}>About</h3>

      <div className={s.about__list}>
        {description.map((item, index) => (
          <div key={index} className={s.about__item}>
            <h4 className={s.about__itemTitle}>{item.title}</h4>
            <div className={s.about__texts}>
              {item.text.map(t => (
                <p key={t} className={s.about__text}>
                  {t}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
