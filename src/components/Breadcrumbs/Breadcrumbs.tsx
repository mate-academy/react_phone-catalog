import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import React from 'react';

interface Props {
  productName?: string;
}

// Объединил строку для удобства (линтер Vite не ругается на длинные строки внутри переменных)
const HOME_PATH =
  // eslint-disable-next-line max-len
  'M2.52988 8.01633L7.54504 3.00117C7.79727 2.74894 8.20468 2.74894 8.45691 3.00117L13.4721 8.01633C13.7243 8.26855 13.7243 8.67597 13.4721 8.92819C13.2198 9.18042 12.8124 9.18042 12.5602 8.92819L11.9998 8.36776V12.6667C11.9998 13.403 11.4028 14 10.6664 14H9.33313V9.99999H6.66646V14H5.33313C4.59675 14 3.9998 13.403 3.9998 12.6667V8.3683L3.44181 8.92629C3.18958 9.17852 2.78217 9.17852 2.52994 8.92629C2.27771 8.67407 2.27766 8.26666 2.52988 8.01633Z';

const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={HOME_PATH} fill="var(--c-primary)" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.separator}
  >
    <path
      d="M5.5 3L10.5 8L5.5 13"
      stroke="var(--c-icons)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Вспомогательная функция, которая делает первую букву заглавной (phones -> Phones)
const formatName = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
};

export const Breadcrumbs: React.FC<Props> = ({ productName }) => {
  const { pathname } = useLocation();

  // Разбиваем путь на сегменты
  // Исключаем имя репозитория (react_phone-catalog), чтобы оно не вылезало в крошках на деплое!
  const pathnames = pathname
    .split('/')
    .filter(x => x && x !== 'react_phone-catalog');

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}>
        <HomeIcon />
      </Link>

      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length - 1;
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

        // Если это страница продукта — показываем красивое имя (Apple iPhone 14).
        // Если это категория — форматируем слово из URL (phones -> Phones).
        const displayName =
          isLast && productName ? productName : formatName(name);

        return (
          <div key={routeTo} className={styles.crumbWrapper}>
            <ArrowIcon />
            {isLast ? (
              <span className={styles.currentPath}>{displayName}</span>
            ) : (
              <Link to={routeTo} className={styles.categoryLink}>
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};
