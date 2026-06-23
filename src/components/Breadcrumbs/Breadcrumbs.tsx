import { Link } from 'react-router-dom';
import cn from 'classnames';

import style from './Breadcrumbs.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../provider/ThemeContextProvider';

export const Breadcrumbs = ({
  type,
  name,
  modifier,
}: {
  type: string;
  name?: string;
  modifier?: string;
}) => {
  const category = type.charAt(0).toUpperCase() + type.slice(1);

  const { theme } = useContext(ThemeContext);
  const back = type === 'back' ? '' : type;

  return (
    <div
      className={cn(style.breadcrumbs, {
        [style[`breadcrumbs--${modifier}`]]: modifier,
      })}
    >
      <Link
        to={'/'}
        className={cn(
          `${style.breadcrumbs__icon}  ${style['breadcrumbs__icon--home']}`,
          {
            [style[`breadcrumbs__icon--home-${modifier}`]]: modifier,
            [style[`breadcrumbs__icon--home-${theme}`]]: theme,
          },
        )}
      ></Link>

      <div
        className={cn(
          `${style.breadcrumbs__icon}  ${style['breadcrumbs__icon--back']}`,
          {
            [style[`breadcrumbs__icon--back-${modifier}`]]: modifier,
            [style[`breadcrumbs__icon--back-${theme}`]]: theme,
          },
        )}
      ></div>

      <Link
        to={`/${back}`}
        className={cn(style.breadcrumbs__category, {
          [style[`breadcrumbs__category--${modifier}`]]: modifier,
          [style[`breadcrumbs__category--${type}`]]: category,
        })}
      >
        {category}
      </Link>

      {name && (
        <>
          <div
            className={cn(
              `${style.breadcrumbs__icon}  ${style['breadcrumbs__icon--back']}`,
              {
                [style[`breadcrumbs__icon--back-${modifier}`]]: modifier,
                [style[`breadcrumbs__icon--back-${theme}`]]: theme,
              },
            )}
          ></div>
          <p className={style.breadcrumbs__name}>{name}</p>
        </>
      )}
    </div>
  );
};
