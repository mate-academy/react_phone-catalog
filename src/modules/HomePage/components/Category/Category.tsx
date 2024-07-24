import classNames from 'classnames';
import './Category.scss';
import { Link } from 'react-router-dom';

type Props = {
  category: {
    img: string;
    id: number;
    title: string;
    ammount: number;
    link: string;
  };
  isLoading: boolean;
};

export const Category: React.FC<Props> = ({ category, isLoading }) => {
  const { img, title, ammount, link } = category;

  return (
    <article
      className={classNames('category', {
        'is-loading': isLoading,
      })}
    >
      <Link to={`/${link}`}>
        <img className="category__img" src={img} alt={title} />
      </Link>

      <div className="category__info">
        <h4 className="category__title">{title}</h4>
        <p className="category__info">{ammount} models</p>
      </div>
    </article>
  );
};
