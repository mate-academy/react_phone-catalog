import React, { useCallback, useContext, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { NavLink } from 'react-router-dom';
import { icons } from '../utils/icons';
import '../styles/style.scss';
import { Product } from '../types/Product';
import { Pagination } from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { ProductCardItem } from '../types/CartItem';
import { CartsContext } from './Context/CartsContext';
import { FavouritesContext } from './Context/FavouritesContext';
import { Sort } from '../components/Sort';
import { sortProducts, SortType } from '../utils/sortProducts';
import { mapToCardItems } from '../utils/mapToCardItem';
import { Loader } from './Loader';

type Props = {
  product: Product[];
  loading: boolean;
  error: string;
  title: string;
  mobTitle?: string;
};

export const PageStructure: React.FC<Props> = ({
  product,
  loading,
  error,
  title,
  mobTitle = title,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { carts, setCarts } = useContext(CartsContext);
  const { favourites, setFavourites } = useContext(FavouritesContext);

  const page = Number(searchParams.get('page')) || 1;
  const perPageFromUrl = searchParams.get('perPage');
  const itemsPerPage: number | 'all' =
    perPageFromUrl === null ? 'all' : Number(perPageFromUrl);

  const sortFromUrl = searchParams.get('sort');
  const sort: SortType =
    sortFromUrl === 'alphabetically' ||
    sortFromUrl === 'cheapest' ||
    sortFromUrl === 'newest'
      ? sortFromUrl
      : 'newest';

  const handleSortChange = (value: SortType) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    params.delete('page');

    setSearchParams(params);
  };

  const sortedProducts = useMemo(() => {
    return sortProducts(product, sort);
  }, [product, sort]);

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');

    setSearchParams(params);
  };

  const visibleProducts = useMemo(() => {
    if (itemsPerPage === 'all') {
      return sortedProducts;
    }

    return sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [sortedProducts, page, itemsPerPage]);

  const cardProducts = useMemo(() => {
    return mapToCardItems(visibleProducts);
  }, [visibleProducts]);

  const toggleCart = useCallback(
    (item: ProductCardItem) => {
      setCarts(prev => {
        const existing = prev.find(c => c.id === item.id);

        if (existing) {
          return prev.filter(c => c.id !== item.id);
        }

        return [...prev, { ...item, quantity: 1 }];
      });
    },
    [setCarts],
  );

  const toggleFavourite = (item: ProductCardItem) => {
    setFavourites(prev =>
      prev.some(f => f.id === item.id)
        ? prev.filter(f => f.id !== item.id)
        : [...prev, item],
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="productLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!product.length) {
    return (
      <p data-cy="noProductsMessage">There are no products on the server</p>
    );
  }

  return (
    <div className="page">
      <>
        <div className="page__top">
          <NavLink to="/" end className="logo logo--house">
            <img
              className="icon icon--house"
              src={icons.logoHouse}
              alt="Logo"
            />
          </NavLink>
          <div className="icon icon--arrow">
            <img src={icons.arrowIconRight} alt="Logo arrow"></img>
          </div>
          <div className="page__top--title">{title}</div>
        </div>
        <div className="page__title text-h1">{mobTitle}</div>
        <p className="page__amount">{product.length} models</p>
        <Sort
          sort={sort}
          handleSortChange={handleSortChange}
          handlePerPageChange={handlePerPageChange}
          itemsPerPage={itemsPerPage}
        />
        <div className="page__content">
          {cardProducts.map(item => (
            <ProductCard
              key={item.id}
              products={item}
              productsDiscount={item.price}
              isFavourite={id => favourites.some(f => f.id === id)}
              isCarts={id => carts.some(c => c.id === id)}
              handleToggleFavourite={toggleFavourite}
              handleToggleCarts={toggleCart}
            />
          ))}
        </div>
        <Pagination totalItems={sortedProducts.length} />
      </>
    </div>
  );
};
