import { memo } from 'react';
import { Link } from 'react-router-dom';
import { TitleTag } from '../../../shared/ui/TitleTag/TitleTag';
import classNames from 'classnames';
import cls from './categories.module.scss';
import { useAppSelector } from '../../../shared/lib/hooks/reduxHooks';
import { getCateroryItems } from '../model/selectors/getCateroryItems';

interface Props {
  className?: string;
}

export const Categories = memo(({ className }: Props) => {
  const categoriesList = useAppSelector(getCateroryItems);

  return (
    <div className={classNames(cls.categories, className)}>
      {categoriesList.map(({ imagePath, link, title, count }) => (
        <Link to={link} key={link} className={cls.categories__item}>
          <div className={cls.categories__image}>
            <img src={imagePath} alt="category" />
          </div>

          <TitleTag
            Tag="h4"
            title={title}
            className={cls.categories__category}
          />

          <p className={cls.categories__count}>{`${count} models`}</p>
        </Link>
      ))}
    </div>
  );
});
