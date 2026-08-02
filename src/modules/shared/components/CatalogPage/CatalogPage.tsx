import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useShopState, type Device } from '../../hooks';
import { Breadcrumb } from '../Breadcrumb';
import { Dropdown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './CatalogPage.module.scss';

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'] as const;
const SORT_OPTIONS = ['newest', 'alphabetically', 'cheapest'] as const;

const SORT_LABELS: Record<(typeof SORT_OPTIONS)[number], string> = {
    newest: 'Newest',
    alphabetically: 'Alphabetically',
    cheapest: 'Cheapest',
};

const PER_PAGE_LABELS: Record<(typeof PER_PAGE_OPTIONS)[number], string> = {
    '4': '4',
    '8': '8',
    '16': '16',
    all: 'All',
};
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 'all';
const DEFAULT_SORT = 'newest';

export interface CatalogPageProps {
    title: string;
    items: Device[];
    searchEmptyLabel: string;
}

const getValidPerPage = (value: string | null) => {
    if (
        value &&
        PER_PAGE_OPTIONS.includes(value as (typeof PER_PAGE_OPTIONS)[number])
    ) {
        return value;
    }

    return DEFAULT_PER_PAGE;
};

const getValidSort = (value: string | null) => {
    if (
        value &&
        SORT_OPTIONS.includes(value as (typeof SORT_OPTIONS)[number])
    ) {
        return value;
    }

    return DEFAULT_SORT;
};

export const CatalogPage = ({
    title,
    items,
    searchEmptyLabel,
}: CatalogPageProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { favoriteIds, isInCart, toggleFavorite, addToCart } = useShopState();
    const { products } = useProducts();

    const perPageParam = getValidPerPage(searchParams.get('perPage'));
    const sortParam = getValidSort(searchParams.get('sort'));
    const queryParam = searchParams.get('query')?.trim().toLowerCase() ?? '';
    const rawPage = Number(searchParams.get('page') || DEFAULT_PAGE);
    const currentPage =
        Number.isNaN(rawPage) || rawPage < 1 ? DEFAULT_PAGE : rawPage;
    const itemsPerPage =
        perPageParam === 'all' ? items.length || 1 : Number(perPageParam);
    const productYears = useMemo(
        () => new Map(products.map(product => [product.itemId, product.year])),
        [products],
    );
    const filteredItems = useMemo(
        () =>
            items.filter(item => item.name.toLowerCase().includes(queryParam)),
        [items, queryParam],
    );
    const sortedItems = useMemo(() => {
        const sorted = [...filteredItems];

        switch (sortParam) {
            case 'alphabetically':
                sorted.sort((firstItem, secondItem) =>
                    firstItem.name.localeCompare(secondItem.name),
                );
                break;

            case 'cheapest':
                sorted.sort(
                    (firstItem, secondItem) =>
                        firstItem.priceDiscount - secondItem.priceDiscount,
                );
                break;

            case 'newest':
            default:
                sorted.sort((firstItem, secondItem) => {
                    const firstYear = productYears.get(firstItem.id) || 0;
                    const secondYear = productYears.get(secondItem.id) || 0;

                    if (firstYear !== secondYear) {
                        return secondYear - firstYear;
                    }

                    return firstItem.name.localeCompare(secondItem.name);
                });
                break;
        }

        return sorted;
    }, [filteredItems, productYears, sortParam]);
    const totalPages = Math.max(
        1,
        Math.ceil(sortedItems.length / itemsPerPage),
    );
    const safeCurrentPage = Math.min(currentPage, totalPages);

    const visibleItems = useMemo(() => {
        if (perPageParam === 'all') {
            return sortedItems;
        }

        const startIndex = (safeCurrentPage - 1) * itemsPerPage;

        return sortedItems.slice(startIndex, startIndex + itemsPerPage);
    }, [itemsPerPage, perPageParam, safeCurrentPage, sortedItems]);

    const updateParams = useCallback(
        (page: number, perPage: string, sort: string) => {
            const nextParams = new URLSearchParams(searchParams);

            if (page <= 1) {
                nextParams.delete('page');
            } else {
                nextParams.set('page', String(page));
            }

            if (perPage === DEFAULT_PER_PAGE) {
                nextParams.delete('perPage');
            } else {
                nextParams.set('perPage', perPage);
            }

            if (sort === DEFAULT_SORT) {
                nextParams.delete('sort');
            } else {
                nextParams.set('sort', sort);
            }

            setSearchParams(nextParams);
        },
        [searchParams, setSearchParams],
    );

    const handlePageChange = (page: number) => {
        updateParams(page, perPageParam, sortParam);
    };

    const handlePerPageChange = (nextPerPage: string) => {
        updateParams(DEFAULT_PAGE, nextPerPage, sortParam);
    };

    const handleSortChange = (nextSort: string) => {
        updateParams(DEFAULT_PAGE, perPageParam, nextSort);
    };

    useEffect(() => {
        if (safeCurrentPage !== currentPage) {
            updateParams(safeCurrentPage, perPageParam, sortParam);
        }
    }, [currentPage, perPageParam, safeCurrentPage, sortParam, updateParams]);

    return (
        <section className={styles.catalogPage}>
            <Breadcrumb />
            <h1 className={styles.catalogPage__title}>{title}</h1>
            <p className={styles.catalogPage__count}>
                {sortedItems.length} models
            </p>

            <div className={styles.catalogPage__controls}>
                <div className={styles.catalogPage__control}>
                    <span className={styles.catalogPage__controlLabel}>
                        Sort by
                    </span>
                    <Dropdown
                        value={sortParam}
                        onChange={handleSortChange}
                        ariaLabel="Sort products"
                        options={SORT_OPTIONS.map(option => ({
                            value: option,
                            label: SORT_LABELS[option],
                        }))}
                    />
                </div>

                <div className={styles.catalogPage__control}>
                    <span className={styles.catalogPage__controlLabel}>
                        Items on page
                    </span>
                    <Dropdown
                        value={perPageParam}
                        onChange={handlePerPageChange}
                        ariaLabel="Items on page"
                        options={PER_PAGE_OPTIONS.map(option => ({
                            value: option,
                            label: PER_PAGE_LABELS[option],
                        }))}
                    />
                </div>
            </div>

            {sortedItems.length === 0 ? (
                <p className={styles.catalogPage__empty}>
                    There are no {searchEmptyLabel} matching the query
                </p>
            ) : (
                <>
                    <div className={styles.catalogPage__grid}>
                        {visibleItems.map(item => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                detailsPath={`/product/${item.id}`}
                                image={getPublicPath(item.images[0])}
                                title={item.name}
                                price={item.priceDiscount}
                                fullPrice={item.priceRegular}
                                screen={item.screen}
                                capacity={item.capacity}
                                ram={item.ram}
                                isFavorite={favoriteIds.includes(item.id)}
                                onFavoriteToggle={toggleFavorite}
                                isInCart={isInCart(item.id)}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>

                    <Pagination
                        total={sortedItems.length}
                        perPage={itemsPerPage}
                        currentPage={safeCurrentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </section>
    );
};
