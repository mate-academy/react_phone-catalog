import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

// однин елемент хлібних крихт
interface BreadcrumbItem {
  label: string; // текст,що відображається ("Phones", тощо)
  path?: string; // шлях для посилання
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]; // елементів шляху(масив)
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ul className={styles.list}>
        {/* посилання на головну сторінку у вигляді іконки*/}
        <li className={styles.item}>
          <Link to="/" className={styles.homeLink}>
            <img src="img/icons/Home.svg" alt="" aria-label="Home" />
          </Link>
        </li>

        {/* перебираємо масив. додаткових кроків (категорія => товар) */}
        {items.map((item, index) => {
          // опред. чи є цей елемент останнім у масиві
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.label}>
              {/* розділювач */}
              <span className={styles.separator}>&gt;</span>

              <li className={styles.item}>
                {/* якщо => останній елемент або шляху немає => просто назва товару */}
                {isLast || !item.path ? (
                  <span className={styles.current}>{item.label}</span>
                ) : (
                  // є шлях => виводимо активне посилання через роутер
                  <Link to={item.path} className={styles.link}>
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
