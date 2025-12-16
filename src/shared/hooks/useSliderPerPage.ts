import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '../styles/constants';

// визначаємо кількість карток на сторінці відповідно до ширини вікна
const getPerPage = (width: number): number => {
  if (width < BREAKPOINTS.tablet) {
    return 2;
  }

  if (width < BREAKPOINTS.desktop) {
    return 3;
  }

  return 4;
};

export const useSliderPerPage = (): number => {
  //встановлюємо useState for perPage
  // але замість конкретного значення пишемо функцію-ініціалізатор
  // це потрібно, щоб perPage змінювався не кожного рендеру,
  // а лише при маунті
  const [perPage, setPerPage] = useState(() => {
    // window.innerWidth - це реальна ширина області,
    // де рендериться сторінка (viewport width)
    return getPerPage(window.innerWidth); // це початкове значення
  });

  // useEffect - відслідковуємо розмір вінка
  useEffect(() => {
    const handleResize = () => {
      setPerPage(getPerPage(window.innerWidth));
    };

    //підписуємось на подію

    window.addEventListener('resize', handleResize);

    //відписуємось від події функція очищення

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return perPage;
};
