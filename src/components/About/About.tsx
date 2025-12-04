import { Item } from '../../types/Item';
import s from './About.module.scss';

type Props = {
  product: Item;
};

export const About: React.FC<Props> = ({ product }) => {
  return (
    <div className={s.about}>
      {product.description.map((info, index) => {
        return (
          <article key={index}>
            <h3 className={s.about__title}>{info.title}</h3>

            {info.text.map((chapter, i) => {
              return (
                <p key={i} className={s.about__text}>
                  {chapter}
                </p>
              );
            })}
          </article>
        );
      })}
    </div>
  );
};
