import { Link } from 'react-router-dom';
import { Categories, CategoriesType } from '../Category';
import navigationCardStyle from './NavigationCard.module.scss';
import classNames from 'classnames';

type Props = {
  category: CategoriesType;
  count: number;
};

const getCategoryProps = (category: string) => {
  let title = '';

  switch (category) {
    case Categories.Phones:
      title = 'Mobile phones';
      break;
    case Categories.Tablets:
      title = 'Tablets';
      break;
    case Categories.Accessories:
      title = 'Accessories';
      break;
  }

  return {
    linkTo: `/${category}`,
    img: `./img/categories/${category}.png`,
    title: title,
  };
};

export const NavigationCard = ({ category, count }: Props) => {
  const { linkTo, img, title } = getCategoryProps(category);

  return (
    <div className={navigationCardStyle.navigationCard}>
      <Link to={linkTo}>
        <img src={img} alt={title} className={navigationCardStyle.image} />

        <h4 className={classNames('font-h4', navigationCardStyle.title)}>
          {title}
        </h4>
      </Link>
      <p
        className={classNames('font-body', navigationCardStyle.count)}
      >{`${count} models`}</p>
    </div>
  );
};
