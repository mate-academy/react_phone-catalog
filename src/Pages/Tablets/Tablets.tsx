import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Tablet } from '../../Types/BaseItem';
import { useCartContext } from '../../CartContext/useCartContext';
import { Link, useSearchParams } from 'react-router-dom';
import './Tablet.scss';
import { SearchParameters } from '../../SearchParm/SearchParam';
const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

export const Tablets: React.FC = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [filteredTablets, setFilteredTablets] = useState<Tablet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  const {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
  } = useCartContext();

  const sortOption = searchParams.get('sort') || 'default';
  const itemsPerPage = +(searchParams.get('perPage') || 4);
  const currentPage = +(searchParams.get('page') || 1);

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('favoriteIds');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const [addToCartIds, setAddToCartIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('addToCartIds');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    const storedCartIds = localStorage.getItem('addToCartIds');
    const storedFavIds = localStorage.getItem('favoriteIds');

    if (storedCartIds) {
      setAddToCartIds(new Set(JSON.parse(storedCartIds)));
    }

    if (storedFavIds) {
      setFavoriteIds(new Set(JSON.parse(storedFavIds)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'addToCartIds',
      JSON.stringify(Array.from(addToCartIds)),
    );
  }, [addToCartIds]);

  useEffect(() => {
    localStorage.setItem(
      'favoriteIds',
      JSON.stringify(Array.from(favoriteIds)),
    );
  }, [favoriteIds]);

  const toggleFavorite = useCallback(
    (tablet: Tablet) => {
      const isInFavorites = favorites.some((fav) => fav.id === tablet.id);

      if (isInFavorites) {
        removeFromFavorites(tablet.id);
        setFavoriteIds((prev) => {
          const updated = new Set(prev);
          updated.delete(tablet.id);
          return updated;
        });
      } else {
        addToFavorites(tablet);
        setFavoriteIds((prev) => new Set(prev).add(tablet.id));
      }
    },
    [favorites, addToFavorites, removeFromFavorites],
  );

  const toggleToCart = useCallback(
    (tablet: Tablet) => {
      const isInCart = cart.some((cartItem) => cartItem.item.id === tablet.id);

      if (isInCart) {
        removeFromCart(tablet.id);
        setAddToCartIds((prev) => {
          const updated = new Set(prev);
          updated.delete(tablet.id);
          return updated;
        });
      } else {
        addToCart(tablet);
        setAddToCartIds((prev) => new Set(prev).add(tablet.id));
      }
    },
    [cart, addToCart, removeFromCart],
  );

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredTablets];

    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.priceDiscount - a.priceDiscount);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredTablets, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const response = await fetch('./api/tablets.json');

        if (!response.ok) {
          throw new Error('Failed to fetch tablets');
        }

        const data: Tablet[] = await response.json();

        setTablets(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTablets();
  }, []);

  useEffect(() => {
    setFilteredTablets(
      tablets.filter((tablet) =>
        tablet.name.toLowerCase().includes(searchQuery),
      ),
    );
  }, [searchQuery, tablets]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="tablet_page">
      <SearchParameters />
      <h1 className="tablets-header">Tablets</h1>
      <h2 className="tablets-available__title">
        {filteredTablets.length} Tablets Available
      </h2>
      <div className="tablet-list__boxSort">
        <div>
          <label className="tablet-list_sortBy">Sort by:</label>
          <select
            className="tablet-list_sortBy__select"
            value={sortOption}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set('sort', e.target.value);
              newParams.set('page', '1');
              setSearchParams(newParams);
            }}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>

        <div>
          <label className="tablet-list_itemPerPage">Items per page:</label>
          <select
            className="tablet-list_itemPerPage__select"
            value={itemsPerPage}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set('perPage', e.target.value);
              newParams.set('page', '1');
              setSearchParams(newParams);
            }}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={32}>32</option>
          </select>
        </div>
      </div>
      <div className="tablet-list">
        {paginatedProducts.map((tablet: Tablet) => (
          <div
            key={tablet.id}
            className="tablet-card a"
          >
            <Link to={`/tablets/${tablet.id}`}>
              <img
                src={tablet.images[0]}
                alt={tablet.name}
                className="tablet-image"
              />
              <div className="tablet-info">
                <h3 className="tablet-cardname">{tablet.name}</h3>
                <p className="tabletcardprice">${tablet.priceDiscount}</p>
                <p className="tablet-card__detail">
                  <span>Screen</span> <span>{tablet.screen}</span>
                </p>
                <p className="tablet-card__detail">
                  <span>Capacity</span> <span>{tablet.capacity}</span>
                </p>
                <p className="tablet-card__detail">
                  <span>RAM</span> <span>{tablet.ram}</span>
                </p>
              </div>
            </Link>
            <div className="tablet-card__actions">
              <button
                className={`tablet-card__actions__btn-primary ${
                  addToCartIds.has(tablet.id) ? 'added' : ''
                }`}
                onClick={() => toggleToCart(tablet)}
              >
                {addToCartIds.has(tablet.id) ? 'Added' : 'Add to cart'}
              </button>
              <img
                onClick={() => toggleFavorite(tablet)}
                className="tablet-card__actions__btn-favorite"
                src={favoriteIds.has(tablet.id) ? HeartFilled : HeartEmpty}
                alt="Favorite"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="tablets_pagination">
        <button
          onClick={() => {
            const newPage = Math.max(currentPage - 1, 1);
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('page', String(newPage));
            setSearchParams(newParams);
          }}
          disabled={currentPage === 1}
          className="tablets_pagination_button"
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter((page) => {
            if (totalPages <= 4) return true;
            if (currentPage <= 2) return page <= 4;
            if (currentPage >= totalPages - 1) return page >= totalPages - 3;
            return Math.abs(currentPage - page) <= 1;
          })
          .map((page) => (
            <button
              key={page}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.set('page', String(page));
                setSearchParams(newParams);
              }}
              className={`tablets_pagination_button ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}

        <button
          onClick={() => {
            const newPage = Math.min(currentPage + 1, totalPages);
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('page', String(newPage));
            setSearchParams(newParams);
          }}
          disabled={currentPage === totalPages}
          className="tablets_pagination_button"
        >
          →
        </button>
      </div>
    </div>
  );
};
