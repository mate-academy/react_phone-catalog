import { Link } from 'react-router-dom';
import { Category } from '../../../features/types/Category';
import cl from './CategoryCard.module.scss';

type Props = {
  category: Category;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <article className={cl.articleContainer}>
      <Link
        to={category.link}
        className={cl.linkImg}
        style={{ backgroundImage: `url(${category.img})` }}
      />

      <div className={cl.textContainer}>
        <Link to={category.link} className={cl.textContainer__link}>
          <h3 className={cl.textContainer__title}>{category.name}</h3>
        </Link>
        <p
          className={cl.textContainer__text}
        >{`${category.quantity} models`}</p>
      </div>
    </article>
  );
};
