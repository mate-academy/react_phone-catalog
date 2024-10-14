import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';
import { Phone } from '../../types/phone';
import { Products } from '../../types/products';
import { useAppContext } from '../../ContextStor';

type Props = {
  products: Phone[] | Tablet[] | Accessory[];
  type: 'phones' | 'tablets' | 'accessories';
};

export const List: React.FC<Props> = ({ type }) => {
  const { favorites, cart, setCart, setFavorites } = useAppContext();

  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const [products, setProducts] = useState<Products[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Products[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const visiblePageCount = 3;

  const startPage = Math.max(currentPage - Math.floor(visiblePageCount / 2), 1);
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  useEffect(() => {
    fetch('./api/products.json')
      .then(response => response.json())
      .then((data: Products[]) => {
        const filteredProducts = data.filter(el => el.category === type);

        setProducts(filteredProducts);
        setSortedProducts(filteredProducts);
      });
  }, [type]);

  useEffect(() => {
    let sortedData = [...products];

    const sortParam = searchParams.get('sort') || 'Default';

    switch (sortParam) {
      case 'Alphabetically':
        sortedData = sortedData.sort((one, two) =>
          one.name.localeCompare(two.name),
        );
        break;

      case 'Cheapest':
        sortedData = sortedData.sort((one, two) => one.price - two.price);
        break;

      case 'Default':
        sortedData = sortedData.sort((one, two) => two.year - one.year);
        break;
    }

    const itemsOnPage = searchParams.get('perPage') || '4';

    setItemsPerPage(Number(itemsOnPage));

    if (!searchParams.toString()) {
      setSortedProducts(sortedData);
    } else {
      const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      );

      setSortedProducts(paginatedData);
    }
  }, [products, searchParams, currentPage, itemsPerPage]);

  const toggleFavorite = (product: Products) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);

    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const toggleCart = (product: Products) => {
    const isCart = cart.some(el => el.id === product.id);

    if (isCart) {
      setCart(cart.filter(el => el.id !== product.id));
    } else {
      setCart([...cart, product]);
    }
  };

  return (
    <>
      <ul className="card__grid">
        {sortedProducts.length > 0 &&
          sortedProducts.map(product => (
            <div key={product.id} className="card">
              <Link to={`/${type}/${product.itemId}`}>
                <img
                  className="card__image"
                  src={product.image}
                  alt="card-image"
                />
              </Link>
              <p className="card__name">{product.name}</p>
              <p className="card__price-regular">{`${product.price}$`}</p>

              <div className="card__line"></div>

              <div className="card__screen">
                <p className="card__screen-name">Screen</p>
                <p className="card__screen-info">{product.screen}</p>
              </div>

              <div className="card__capacity">
                <p className="card__capacity-name">Capacity</p>
                <p className="card__capacity-info">{product.capacity}</p>
              </div>

              <div className="card__ram">
                <p className="card__ram-name">Ram</p>
                <p className="card__ram-info">{product.ram}</p>
              </div>

              <div className="card__buy">
                <button
                  onClick={() => toggleCart(product)}
                  className={`${cart.some(el => el.id === product.id) ? 'added-to-cart' : 'card__buy-cart'}`}
                >
                  {cart.some(el => el.id === product.id)
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>
                <img
                  onClick={() => toggleFavorite(product)}
                  className="page-home-card__favorite"
                  src={
                    favorites.some(fav => fav.id === product.id)
                      ? './img/Add to fovourites - Added.svg'
                      : './img/add-to-cart.svg'
                  }
                  alt="favorite"
                />
              </div>
            </div>
          ))}
      </ul>

      <div className="pagination">
        <button
          className="pagination--previous"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;

          return (
            <button
              key={index + 1}
              className={`pagination--str ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className="pagination--next"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};
