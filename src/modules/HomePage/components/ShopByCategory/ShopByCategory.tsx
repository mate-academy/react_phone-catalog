import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

export const ShopByCategory = () => {
  const { isDark } = useContext(DarkModeContext);
  const categoryDetails = [
    { category: 'Mobile phones', num: '124 models', img: 'phones' },
    { category: 'Tablets', num: '36 models', img: 'tablets' },
    { category: 'Accessories', num: '34 models', img: 'accessories' },
  ];

  return (
    <div className="categories">
      <h2
        className={classNames('title title--h2', {
          'title--is-Dark': isDark,
        })}
      >
        Shop by category
      </h2>

      <div className="categories__container">
        {categoryDetails.map(item => (
          <Link
            key={item.category}
            to="phones"
            className={classNames('categories__card', {
              'categories__card--is-Dark': isDark,
            })}
          >
            <div
              className={`categories__img categories__img--${item.img}`}
            ></div>

            <div className="categories__text">
              <p
                className={classNames('title title--h4', {
                  'title--is-Dark': isDark,
                })}
              >
                {item.category}
              </p>

              <p className="body-text">{item.num}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
