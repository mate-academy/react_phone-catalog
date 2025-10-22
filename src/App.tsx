import React, { useEffect, useState } from 'react';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import useThemeStore from './stores/useThemeStore'; // Імпорт стору теми
import { Footer } from './components/Footer';
// import 'swiper/css';
// import 'swiper/css/navigation';

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // Для відстеження зміни маршруту

  // Отримуємо початкове значення пошуку з URL, якщо воно є
  const initialSearchQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const { currentTheme } = useThemeStore(); // Отримуємо поточну тему

  // Застосування класу теми до body
  useEffect(() => {
    document.body.className = `theme-${currentTheme}`; // Додаємо клас, наприклад, 'theme-light', 'theme-dark'
  }, [currentTheme]);

  // Очищаємо пошуковий запит при зміні маршруту, якщо це не сторінка категорії
  // Це запобігає збереженню пошукового запиту, якщо користувач перейшов на іншу сторінку
  // (наприклад, з телефонів на планшети, або на домашню сторінку)
  React.useEffect(() => {
    // Якщо поточний шлях не є сторінкою категорії, скидаємо пошуковий запит в навбарі.
    // Або ви можете дозволити пошуку залишатися, якщо це між категоріями.
    // Це залежить від вашої бізнес-логіки.
    // Приклад: якщо шлях не починається з /phones, /tablets, /accessories
    const isCategoryPage = ['/phones', '/tablets', '/accessories'].some(path =>
      location.pathname.startsWith(path),
    );

    if (!isCategoryPage && searchQuery) {
      setSearchQuery(''); // Скидаємо локальний стан пошуку в навбарі
      // Також важливо скинути URLSearchParams, якщо ви хочете, щоб URL був чистим
      setSearchParams(
        prev => {
          prev.delete('query');

          return prev;
        },
        { replace: true },
      );
    }
  }, [location.pathname, setSearchQuery, setSearchParams, searchQuery]);

  // Функція для оновлення пошукового запиту, яка також оновлює URL
  const handleSearchChange = (query: string) => {
    setSearchQuery(query); // Оновлюємо внутрішній стан Navbar
    // Оновлюємо URLSearchParams
    setSearchParams(
      prev => {
        if (query) {
          prev.set('query', query);
        } else {
          prev.delete('query');
        }

        prev.delete('page'); // Зазвичай при пошуку скидаємо пагінацію на першу сторінку

        return prev;
      },
      { replace: true },
    ); // replace: true, щоб не додавати зайві записи в історію браузера
  };

  return (
    <div data-cy="app" className="app">
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      <main className="section">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
