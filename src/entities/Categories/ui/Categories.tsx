import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TitleTag } from '../../../shared/ui/TitleTag';
import classNames from 'classnames';
import cls from './categories.module.scss';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/reduxHooks';
import { getCateroryItems } from '../model/selectors/getCateroryItems';
import { fetchCountProducts } from '../model/services/fetchCountProducts';
import { capitalizeFirstLetter } from '../../../shared/lib/utils/capitalizeFirstLetter';

interface Props {
  className?: string;
}

export const Categories = memo(({ className }: Props) => {
  const categoriesList = useAppSelector(getCateroryItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames(cls.categories, className)}>
      {categoriesList.map(({ imagePath, link, title, count }) => (
        <Link to={link} key={link} className={cls.categories__item}>
          <div className={cls.categories__image}>
            <img src={imagePath} alt="category" />
          </div>

          <TitleTag
            Tag="h4"
            title={capitalizeFirstLetter(title)}
            className={cls.categories__category}
          />

          <p className={cls.categories__count}>{`${count} models`}</p>
        </Link>
      ))}
    </div>
  );
});
