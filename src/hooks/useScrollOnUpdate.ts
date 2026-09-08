import { useEffect, useRef, RefObject } from 'react';

/**
 * useScrollOnUpdate
 *
 * Універсальний хук для плавної прокрутки сторінки при оновленні даних.
 *
 * @param ref - Посилання на елемент, до якого потрібно прокрутити (наприклад, секція товарів)
 * @param dependencies - Масив залежностей (наприклад, [category, page, search])
 * @param currentCategory - Поточна категорія (або будь-який ідентифікатор сторінки)
 * @param offset - Відступ від верху (за замовчуванням 74px)
 */
export const useScrollOnUpdate = (
  ref: RefObject<HTMLElement>,
  dependencies: readonly unknown[],
  currentCategory?: string,
  offset: number = 74,
) => {
  const prevCategory = useRef<string | null>(null);

  useEffect(() => {
    // Якщо змінилася категорія (наприклад, phones → tablets або home → phones)
    if (prevCategory.current !== currentCategory) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      prevCategory.current = currentCategory || null;

      return;
    }

    // Якщо категорія не змінилась, але змінилися інші залежності — скролимо до ref
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - offset,
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, currentCategory, offset, ref]);
};
