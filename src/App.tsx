import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../src/styles/main.scss';
import './App.scss';
import { Footer } from './modules/shared/Footer';
import { Header } from './modules/shared/Header';
import { useCallback, useContext, useEffect } from 'react';
import { Menu } from './modules/shared/Menu';
import { GlobalContext } from './store/GlobalContext';

export const App = () => {
  const location = useLocation();

  const { isMenuOpen } = useContext(GlobalContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  // let backClickCount = 0;

  // window.addEventListener('popstate', (event) => {
  //     backClickCount++;
  //     console.log(`Кнопка "Назад" нажата ${backClickCount} раз(а)`);
  // });

  // // Добавим изменения в историю, чтобы была возможность "Назад"
  // history.pushState({}, '', window.location.href);

  window.addEventListener('popstate', (event) => {
    console.log('Событие popstate:', event.state);
  });

  console.log(history);


  useEffect(() => {
    const handlePopstate = (event: PopStateEvent) => {
      console.log('Событие popstate:', event.state);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

//   let currentIdx = 0; // Локальная переменная для отслеживания индекса

//   window.addEventListener('popstate', (event) => {
//     console.log('Событие popstate:', event.state);
//     if (event.state && typeof event.state.idx === 'number') {
//       currentIdx = event.state.idx; // Обновляем текущий индекс
//     }
//   });

//   // Добавление новой записи в историю, только если индекс меняется
//   const newStateIdx = currentIdx + 1;
//   if (!history.state || history.state.idx !== newStateIdx) {
//     currentIdx = newStateIdx; // Увеличиваем локальный индекс
//     history.pushState({ idx: currentIdx }, '', window.location.pathname);
//   }

//   if (!history.state || history.state.idx !== 1) {
//     history.pushState({ idx: 1 }, '', window.location.pathname);
// }

  // const navigate = useNavigate();

  // const handleNavigate = useCallback(() => {
  //   navigate(-2);
  // }, [navigate]);

  // useEffect(() => {
  //   window.addEventListener('popstate', handleNavigate);

  //   return () => {
  //     window.removeEventListener('popstate', handleNavigate);
  //   };
  // }, [handleNavigate]);

  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location.pathname]);

  return (
    <div className="App">
      <h1 className="App__title-hidden">Product Catalog</h1>

      <header className="App__header">
        <Header />
      </header>

      {isMenuOpen && (
        <div className="App__menu">
          <Menu />
        </div>
      )}

      <main className="App__content">
        <Outlet />
      </main>

      <footer className="App__footer">
        <Footer />
      </footer>
    </div>
  );
};
