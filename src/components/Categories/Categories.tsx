/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, useContext } from 'react';
import cn from 'classnames';
import { Link, useAsyncValue } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Styles } from '../../types/Styles';
import { Category } from '../../types/Category';

const styles: Styles = require('./Categories.module.scss');

const {
  Categories: categories,
  Categories__title: title,
  Categories__list: list,
  Categories__link: link,
  Categories__image: image,
  'Categories__item-title': itemTitle,
  'Categories__item-count': itemCount,
  'Categories__item-count--dark': itemCountDark,
} = styles;

type Props = {
  className?: string;
};

export const Categories: FC<Props> = ({ className = '' }) => {
  const { isThemeDark } = useContext(ThemeContext);
  const modelsCount = useAsyncValue() as number[];

  const count = {
    phones: modelsCount[0],
    tablets: modelsCount[1],
    accessories: modelsCount[2],
  };

  return (
    <div className={cn(
      categories,
      className,
    )}
    >
      <h2 className={title}>
        Shop by category
      </h2>

      <ul className={list}>
        {Object.entries(Category).map(([key, value]) => (
          <li
            key={key}
          >
            <Link
              className={cn(
                link,
                styles[`Categories__link--${value}`],
              )}
              to={`/${value}`}
            >
              <img
                className={image}
                src={`./images/Category_${key}.png`}
                alt={key}
              />
            </Link>

            <h3 className={itemTitle}>
              {key}
            </h3>

            <p
              className={cn(
                itemCount,
                { [itemCountDark]: isThemeDark },
              )}
            >
              {`${count[value]} models`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Categories.defaultProps = {
  className: '',
};
