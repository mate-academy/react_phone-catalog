import styles from './CatalogPage.module.scss';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import BreadCrumbs from '../shared/BreadCrumbs';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import Card from '../shared/Card';
import { getProducts } from '../../data/httpClient';
import { getSearch } from '../../data/searchHelper';
import Filter from '../shared/Filter';
import { ProductContext } from '../../contexts/ProductContextProvider';

export interface CatalogTypeDesc {
  title: string;
  text: string;
}

export interface CatalogCard {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: CatalogTypeDesc[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export const CatalogPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { productId } = useParams();
  const pathname = productId || '';

  const parentCards = useContext(ProductContext);

  const perPage = parseInt(searchParams.get('perPage') || '16');
  const sortBy = searchParams.get('sortBy');
  const page = parseInt(searchParams.get('page') || '1');

  const navigate = useNavigate();

  const [cards, setCards] = useState<CatalogCard[]>([]);

  const apiLink = useMemo(() => {
    switch (pathname) {
      case 'phones': {
        return 'api/phones.json';
      }

      case 'tablets': {
        return 'api/tablets.json';
      }

      case 'accessories': {
        return 'api/accessories.json';
      }
    }

    return '';
  }, [pathname]);

  useEffect(() => {
    getProducts({ url: apiLink, method: 'GET' }).then(
      (response: CatalogCard[]) => {
        let sorted = response;

        const sortParam = sortBy || 'newest';

        if (sortParam) {
          switch (sortParam) {
            case 'price': {
              sorted = response.sort(
                (a, b) => a.priceDiscount - b.priceDiscount,
              );

              break;
            }

            case 'title': {
              sorted = response.sort((a, b) => a.name.localeCompare(b.name));

              break;
            }

            case 'newest': {
              const nCards = parentCards.cards;

              sorted = response.sort((a, b) => {
                const firstYear =
                  nCards.find(c => c.itemId === a.id)?.year || 0;

                const lastYear = nCards.find(c => c.itemId === b.id)?.year || 0;

                return lastYear - firstYear;
              });

              break;
            }
          }
        }

        setCards(sorted);
      },
    );
  }, [apiLink, parentCards, sortBy]);

  useEffect(() => {
    if (perPage * (page - 1) > cards.length) {
      navigate(`?${getSearch(searchParams, {
        page: Math.ceil(cards.length / perPage).toString(),
      })}
      `);
    }
  }, [cards.length, navigate, page, perPage, searchParams]);

  const pages: number[] = [];

  for (let i = 0; i < Math.ceil(cards.length / perPage); i++) {
    pages.push(i + 1);
  }

  const title = useMemo(() => {
    switch (pathname) {
      case 'phones': {
        return 'Mobile phones';
      }

      case 'tablets': {
        return 'Tablets';
      }

      case 'accessories': {
        return 'Accessories';
      }
    }

    return '';
  }, [pathname]);

  const getFirstIndex = useCallback(() => {
    const parsedPage = page ? parseInt(page.toString()) : 1;

    if (parsedPage) {
      if (parsedPage > pages.length - 2) {
        return pages.length - 5;
      }

      if (parsedPage > 3) {
        return parsedPage - 3;
      }
    }

    return 0;
  }, [page, pages.length]);

  const getLink = (newPage: number) => {
    const result = getSearch(searchParams, {
      page: newPage.toString(),
    });

    return `?${result}`;
  };

  return (
    <main className={styles.main}>
      <BreadCrumbs pathname={location.pathname} />

      <section className={styles['main__title-wrapper']}>
        <h1 className={styles.main__title}>{title}</h1>

        <p className={styles.main__count}>{cards.length} models</p>
      </section>

      <section className={styles.main__filters}>
        <Filter
          title="Sort by"
          paramName="sortBy"
          param={sortBy || 'newest'}
          list={['newest', 'title', 'price']}
          values={['Newest', 'Alphabetically', 'Cheapest']}
        />

        <Filter
          title="Items on page"
          param={perPage.toString() || '16'}
          paramName="perPage"
          list={['4', '8', '16', cards.length.toString()]}
          values={['4', '8', '16', 'all']}
        />
      </section>

      <section className={styles.main__products}>
        {cards.slice((page - 1) * perPage, page * perPage).map(card => {
          return (
            <Card
              key={'id' + card.id}
              itemId={card.id}
              name={card.name}
              category={card.category}
              price={card.priceDiscount}
              fullPrice={card.priceRegular}
              screen={card.screen}
              capacity={card.capacity}
              ram={card.ram}
              image={card.images[0]}
              isHot
            />
          );
        })}
      </section>

      <section className={styles.main__pagination}>
        <Link
          to={getLink(page > 1 ? page - 1 : page)}
          className={classNames(
            styles.main__button,
            styles['main__button--left'],
            { [styles['main__button--disabled-left']]: page === 1 },
          )}
        >
          <span></span>
        </Link>

        <div className={styles.main__buttons}>
          {pages.slice(getFirstIndex(), getFirstIndex() + 5).map(p => {
            return (
              <Link
                to={getLink(p)}
                key={'page' + p}
                className={classNames(styles.main__subButton, {
                  [styles['main__subButton--active']]: p === page,
                })}
              >
                {p}
              </Link>
            );
          })}
        </div>

        <Link
          to={getLink(page < pages.length ? page + 1 : page)}
          className={classNames(
            styles.main__button,
            styles['main__button--right'],
            { [styles['main__button--disabled-right']]: page === pages.length },
          )}
        >
          <span></span>
        </Link>
      </section>
    </main>
  );
};
