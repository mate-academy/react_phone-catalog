// src/hooks/useProductFilters.ts
import { useSearchParams } from 'react-router-dom'; // используем хук для работы с URL параметрами

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // получаем текущие параметры и функцию для их обновления

  // Получаем значение параметра sort или пустую строку
  const getSortParam = () => searchParams.get('sort') || '';

  // Получаем параметр perPage или 16 по умолчанию, приводим к числу
  const getPerPage = () => parseInt(searchParams.get('perPage') || '16', 10);

  // Получаем текущую страницу или 1 по умолчанию, приводим к числу
  const getPage = () => parseInt(searchParams.get('page') || '1', 10);

  // Устанавливаем сортировку и сбрасываем страницу на 1
  const setSort = (value: string) => {
    searchParams.set('sort', value);         // задаём новый сорт
    searchParams.set('page', '1');           // сбрасываем страницу
    setSearchParams(searchParams);           // обновляем параметры
  };

  // Устанавливаем количество карточек на странице
  const setPerPage = (value: number) => {
    searchParams.set('perPage', value.toString()); // преобразуем число в строку
    searchParams.set('page', '1');                 // тоже сбрасываем страницу
    setSearchParams(searchParams);
  };

  // Устанавливаем текущую страницу
  const setPage = (value: number) => {
    searchParams.set('page', value.toString());
    setSearchParams(searchParams);
  };

  return {
    getSortParam,
    getPerPage,
    getPage,
    setSort,
    setPerPage,
    setPage,
  };
};
