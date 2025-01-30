import { Link } from 'react-router-dom';
import { Category } from '../../../features/types/Category';
import cl from './CategoryCard.module.scss';
import { useAppSelector } from '../../../app/hooks';

type Props = {
  category: Category;
  name: string;
};

const textContent = {
  quantity: {
    en: ' models',
    ua: ' моделі',
  },
};

export const CategoryCard: React.FC<Props> = ({ category, name }) => {
  const { language } = useAppSelector(st => st.global);

  return (
    <article className={cl.articleContainer}>
      <Link
        to={category.link}
        className={cl.linkImg}
        style={{ backgroundImage: `url(${category.img})` }}
      />

      <div className={cl.textContainer}>
        <Link to={category.link} className={cl.textContainer__link}>
          <h3 className={cl.textContainer__title}>{name}</h3>
        </Link>
        <p
          className={cl.textContainer__text}
        >{`${category.quantity} ${textContent.quantity[language]}`}</p>
      </div>
    </article>
  );
};
