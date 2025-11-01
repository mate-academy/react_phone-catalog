import { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Category, ProductListItem } from '../../shared/api/types';
import { getCategoryItems } from '../../shared/api/category';
import { Loader } from '../../shared/components/Loader';
import { ErrorState } from '../../shared/components/ErrorState';
import { ProductsList } from '../../shared/components/ProductsList';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import ArrowRight from '../../assets/Chevron (Arrow Right).svg';
import ArrowLeft from '../../assets/Chevron (Arrow Left).svg';
import st from '../CategoryPage/CategoryPage.module.scss';

type Props = { type: Category };

const SORTS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
] as const;

type SortValue = (typeof SORTS)[number]['value'];

const PER_PAGE_OPTS = ['4', '8', '16', 'all'] as const;

type PerPageValue = (typeof PER_PAGE_OPTS)[number];

export const CategoryPage: React.FC<Props> = ({ type }) => {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // показываем не мгновенные pageItems, а уже предзагруженные
  const [visibleItems, setVisibleItems] = useState<ProductListItem[]>([]);
  const [pageReady, setPageReady] = useState(true);

  // 🔒 фиксация высоты контейнера карточек на время переключения
  const productsBoxRef = useRef<HTMLDivElement>(null);
  const [lockedHeight, setLockedHeight] = useState<number | null>(null);

  // скролл-локер пагинатора
  const pagerRef = useRef<HTMLDivElement | null>(null);
  const lockPrevTopRef = useRef<number | null>(null);
  const needLockRef = useRef(false);

  // 🆕 якорь от низа документа
  const bottomOffsetRef = useRef<number | null>(null);

  const sort = (params.get('sort') as SortValue) || 'age';
  const page = Math.max(1, Number(params.get('page') || '1'));
  const perPage = (params.get('perPage') as PerPageValue) || 'all';
  const query = (params.get('query') || '').trim().toLowerCase();

  // предзагрузка изображений с кэшем
  const imgCache = useRef<Set<string>>(new Set());
  const preloadImages = async (paths: string[] = []) => {
    const uniq = paths
      .filter(Boolean)
      .map(p => (p.startsWith('/') ? p : `/${p}`))
      .filter(p => !imgCache.current.has(p));

    await Promise.all(
      uniq.map(
        p =>
          new Promise<void>(resolve => {
            const img = new Image();

            img.onload = img.onerror = () => {
              imgCache.current.add(p);
              resolve();
            };

            img.src = p;
          }),
      ),
    );
  };

  // вытаскиваем превью/картинку из элемента
  const getThumbFromItem = (i: ProductListItem): string => {
    if ('image' in i && typeof i.image === 'string') {
      return i.image;
    }

    if (
      'thumbnail' in i &&
      typeof (i as { thumbnail?: string }).thumbnail === 'string'
    ) {
      return (i as { thumbnail: string }).thumbnail;
    }

    if ('images' in i && Array.isArray((i as { images?: string[] }).images)) {
      const imgs = (i as { images: string[] }).images;

      return imgs[0] || '';
    }

    return '';
  };

  const reload = () => {
    setLoading(true);
    setError(null);
    getCategoryItems(type)
      .then(list => {
        setItems(list);
      })
      .catch(e => setError(String(e?.message || e)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload(); /* eslint-disable-next-line */
  }, [type]);

  // фильтрация
  const filtered = useMemo(() => {
    if (!query) {
      return items;
    }

    return items.filter(
      i =>
        i.name.toLowerCase().includes(query) ||
        i.capacity.toLowerCase().includes(query) ||
        i.color.toLowerCase().includes(query),
    );
  }, [items, query]);

  // сортировка
  const sorted = useMemo(() => {
    const arr = [...filtered];

    switch (sort) {
      case 'age':
        return arr.sort((a, b) => (b.year || 0) - (a.year || 0));
      case 'title':
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return arr.sort((a, b) => a.price - b.price);
      default:
        return arr;
    }
  }, [filtered, sort]);

  // пагинация
  const total = sorted.length;
  const per = perPage === 'all' ? total : Number(perPage);
  const totalPages = per ? Math.max(1, Math.ceil(total / per)) : 1;
  const currentPage = Math.min(page, totalPages);
  const start = perPage === 'all' ? 0 : (currentPage - 1) * per;
  const end = perPage === 'all' ? total : start + per;
  const pageItems = sorted.slice(start, end);

  // предзагружаем карточки текущей страницы и показываем только после готовности
  useEffect(() => {
    let cancelled = false;

    if (!items.length) {
      return;
    }

    (async () => {
      // 🔒 зафиксировать текущую высоту контейнера, чтобы не было просадки/рывка
      setLockedHeight(productsBoxRef.current?.offsetHeight ?? null);

      setPageReady(false);
      const thumbs = pageItems.map(getThumbFromItem).filter(Boolean);

      await preloadImages(thumbs);
      if (!cancelled) {
        setVisibleItems(pageItems);
        setPageReady(true);

        // отпускаем высоту на следующий кадр после отрисовки
        requestAnimationFrame(() => setLockedHeight(null));
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, sort, query, currentPage, perPage, items]);

  // синхронизация URL-параметров
  useEffect(() => {
    const next = new URLSearchParams(params);

    if (sort !== 'age') {
      next.set('sort', sort);
    } else {
      next.delete('sort');
    }

    if (perPage !== 'all') {
      next.set('perPage', perPage);
    } else {
      next.delete('perPage');
    }

    if (currentPage !== 1) {
      next.set('page', String(currentPage));
    } else {
      next.delete('page');
    }

    if (next.toString() !== params.toString()) {
      setParams(next, { replace: true, preventScrollReset: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, perPage, currentPage]);

  // --- ЛОК СКРОЛЛА: сохраняем положение "от низа документа" + делаем двойную коррекцию ---
  useLayoutEffect(() => {
    if (!needLockRef.current) {
      return;
    }

    const applyBottomLock = () => {
      const doc = document.documentElement;
      const keep = Math.max(0, bottomOffsetRef.current ?? 0);
      const target = Math.max(0, doc.scrollHeight - window.innerHeight - keep);
      // важно: без анимации и прямо тут, в layout-цикле

      window.scrollTo({ top: target, behavior: 'auto' });
    };

    // 1) сразу после коммита
    applyBottomLock();

    // 2) повторяем на следующий кадр — после "отпускания" высоты productsBox
    requestAnimationFrame(() => {
      applyBottomLock();

      // сброс флагов
      needLockRef.current = false;
      lockPrevTopRef.current = null;
      bottomOffsetRef.current = null;
    });
  });
  // ----------------------------------------------------------------

  const title = type.charAt(0).toUpperCase() + type.slice(1);

  if (loading && !items.length) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message="Something went wrong" onRetry={reload} />;
  }

  if (!items.length) {
    return <p style={{ padding: 24 }}>There are no {type} yet</p>;
  }

  if (!pageItems.length) {
    return <p style={{ padding: 24 }}>No items for current filters</p>;
  }

  const goToPage = (n: number) => {
    // старый якорь по top — можно оставить как резерв
    lockPrevTopRef.current =
      pagerRef.current?.getBoundingClientRect().top ?? null;

    // 🆕 запоминаем дистанцию до низа документа
    const doc = document.documentElement;

    bottomOffsetRef.current =
      doc.scrollHeight - (window.scrollY + window.innerHeight);

    needLockRef.current = true;

    setParams(
      p => {
        const next = new URLSearchParams(p);

        if (n > 1) {
          next.set('page', String(n));
        } else {
          next.delete('page');
        }

        return next;
      },
      { preventScrollReset: true },
    );
  };

  return (
    <section className={st.root}>
      <div className={st.inner}>
        <div className={st.back}>
          <Breadcrumbs trail={[{ label: title }]} />
        </div>

        <h1 className={st.title}>{title} page</h1>

        <div className={st.stats}>
          {total} items · Page {currentPage}/{totalPages}
        </div>

        <div className={st.controls}>
          <label className={st.control}>
            <span className={st.controlLabel}>Sort by</span>
            <select
              className={st.select}
              value={sort}
              onChange={e =>
                setParams(
                  p => {
                    const next = new URLSearchParams(p);
                    const v = e.target.value as SortValue;

                    if (v !== 'age') {
                      next.set('sort', v);
                    } else {
                      next.delete('sort');
                    }

                    next.delete('page');

                    return next;
                  },
                  { preventScrollReset: true },
                )
              }
            >
              {SORTS.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className={st.control}>
            <span className={st.controlLabel}>Items on page</span>
            <select
              className={st.select}
              value={perPage}
              onChange={e =>
                setParams(
                  p => {
                    const next = new URLSearchParams(p);
                    const v = e.target.value as PerPageValue;

                    if (v !== 'all') {
                      next.set('perPage', v);
                    } else {
                      next.delete('perPage');
                    }

                    next.delete('page');

                    return next;
                  },
                  { preventScrollReset: true },
                )
              }
            >
              {PER_PAGE_OPTS.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          ref={productsBoxRef}
          className={st.products}
          aria-busy={!pageReady}
          style={lockedHeight != null ? { height: lockedHeight } : undefined}
        >
          <ProductsList items={visibleItems} />
        </div>

        {totalPages > 1 && (
          <div ref={pagerRef} className={st.pager}>
            {/* стрелка влево */}
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage <= 1}
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              className={st.arrowBtn}
              data-disabled={currentPage <= 1 || undefined}
            >
              <img src={ArrowLeft} alt="Previous" width={16} height={16} />
            </button>

            {/* окно страниц */}
            {(() => {
              const WINDOW_SIZE = 4;

              const getPageWindow = (
                current: number,
                totalPagesCount: number,
                size = WINDOW_SIZE,
              ) => {
                if (totalPagesCount <= size) {
                  return { first: 1, last: totalPagesCount };
                }

                let first = current - Math.floor(size / 2);
                let last = first + size - 1;

                if (first < 1) {
                  first = 1;
                  last = size;
                }

                if (last > totalPagesCount) {
                  last = totalPagesCount;
                  first = Math.max(1, totalPagesCount - size + 1);
                }

                return { first, last };
              };

              const { first, last } = getPageWindow(currentPage, totalPages);
              const pages = Array.from(
                { length: last - first + 1 },
                (_, i) => first + i,
              );

              return pages.map(n => (
                <button
                  key={n}
                  onClick={() => goToPage(n)}
                  aria-current={n === currentPage ? 'page' : undefined}
                  className={`${st.pageBtn} ${n === currentPage ? st.pageBtnActive : ''}`}
                >
                  {n}
                </button>
              ));
            })()}

            {/* стрелка вправо */}
            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              className={`${st.arrowBtn} ${st.arrowBtnNext}`}
              data-disabled={currentPage >= totalPages || undefined}
            >
              <img src={ArrowRight} alt="Next" width={16} height={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
