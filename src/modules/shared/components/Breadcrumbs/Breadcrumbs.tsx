import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import style from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label?: string;
  link?: string;
  icon?: ReactNode; // Доб. иконку
  onClick?: () => void; // Добавляем обработчик клика
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  reverseArrow?: boolean;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  reverseArrow = false,
}) => {
  return (
    <nav className={style.breadcrumbs}>
      {items.map((item, idx) => (
        <div key={idx} className={style.breadcrumbItem}>
          {item.onClick ? (
            // Если передали onClick, рендерим кнопку
            <button onClick={item.onClick} className={style.breadcrumbLink}>
              {item.icon && <span className={style.icon}>{item.icon}</span>}
              {item.label}
            </button>
          ) : item.link ? (
            // Иначе если есть ссылка, рендерим Link
            <Link to={item.link} className={style.breadcrumbLink}>
              {item.icon && <span className={style.icon}>{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            // Иначе просто текст
            <span className={style.breadcrumbCurrent}>
              {item.icon && <span className={style.icon}>{item.icon}</span>}
              {item.label}
            </span>
          )}

          {idx < items.length - 1 && (
            <span
              className={`${style.separator} ${reverseArrow ? style.rotate : ''}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.52925 3.52861C5.7896 3.26826 6.21171 3.26826 6.47206 3.52861L10.4721 7.52861C10.7324 7.78896 10.7324 8.21107 10.4721 8.47141L6.47206 12.4714C6.21171 12.7318 5.7896 12.7318 5.52925 12.4714C5.2689 12.2111 5.2689 11.789 5.52925 11.5286L9.05784 8.00001L5.52925 4.47141C5.2689 4.21107 5.2689 3.78896 5.52925 3.52861Z"
                  fill="#B4BDC4"
                />
              </svg>
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};
