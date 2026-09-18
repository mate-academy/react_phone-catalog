import { useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import './PhonesCatalog.scss';
import productsData from '../../public/api/products.json';
import { Footer } from './Footer/Footer';
import { AddToCartButton } from './addToCart';
import { ProductDetails } from './ProductDetailsPage';
import { useFavourites } from './FavouritesContext';

export const TabletsCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { isFavourite, toggleFavourite } = useFavourites();

  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPageParam = searchParams.get('perPage') || '16';
  const sortBy = searchParams.get('sort') || 'newest';

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname, searchParams]);

  const tablets = productsData.filter(
    product => product.category === 'tablets',
  );

  const sortedProducts = [...tablets].sort((a, b) => {
    switch (sortBy) {
      case 'cheapest':
        return a.price - b.price;

      case 'newest':
      default:
        return b.year - a.year;
    }
  });

  const itemsPerPage =
    itemsPerPageParam === 'all'
      ? sortedProducts.length
      : Number(itemsPerPageParam);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleParamChange = (key: string, value: string) => {
    searchParams.set(key, value);
    if (key !== 'page') {
      searchParams.set('page', '1');
    }

    setSearchParams(searchParams);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="phones-catalog">
        <div className="nav-chain">
          <Link to="/" className="nav-chain__icon">
            <img src="./img/Home.svg" alt="Home" />
          </Link>
          <img
            src="./img/VectorNext.svg"
            alt=">"
            className="nav-chain__arrow"
          />
          <span className="nav-chain__text">Tablets</span>
        </div>

        <div className="catalog">
          <h1 className="catalog__title">Tablets</h1>
          <span className="catalog__par">{tablets.length} models</span>

          <div className="catalog__filters">
            <div className="filter filter--sort">
              <label htmlFor="sort" className="filter__label">
                Sort by
              </label>
              <select
                id="sort"
                className="filter__select"
                value={sortBy}
                onChange={e => handleParamChange('sort', e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className="filter filter--items">
              <label htmlFor="per-page" className="filter__label">
                Items on page
              </label>
              <select
                id="per-page"
                className="filter__select"
                value={itemsPerPageParam}
                onChange={e => handleParamChange('perPage', e.target.value)}
              >
                <option value="16">16</option>
                <option value="32">32</option>
              </select>
            </div>
          </div>

          <div className="catalog__grid">
            {visibleProducts.map(product => {
              const isFav = isFavourite(product.itemId);
              const hasDiscount = Boolean(
                product.fullPrice && product.fullPrice > product.price,
              );

              const cardDetails: ProductDetails = {
                id: product.itemId,
                category: product.category,
                namespaceId: '',
                name: product.name,
                capacityAvailable: [],
                capacity: product.capacity,
                priceRegular: product.fullPrice || product.price,
                priceDiscount: product.price,
                colorsAvailable: [],
                color: '',
                images: [product.image],
                description: [],
              };

              return (
                <Link
                  key={product.id}
                  to={`/${product.category}/${product.itemId}`}
                  className="product-card"
                >
                  <div className="product-card__image-wrapper">
                    <img
                      src={`./${product.image}`}
                      alt={product.name}
                      className="product-card__image"
                    />
                  </div>

                  <h3 className="product-card__title">{product.name}</h3>

                  <div className="product-card__price-container">
                    <p className="product-card__price">${product.price}</p>
                    {hasDiscount && (
                      <span className="product-card__full-price">
                        ${product.fullPrice}
                      </span>
                    )}
                  </div>

                  <div className="product-card__divider" />

                  <div className="product-card__specs">
                    <div className="product-card__spec">
                      <span>Screen</span>
                      <span>{product.screen}</span>
                    </div>
                    <div className="product-card__spec">
                      <span>Capacity</span>
                      <span>{product.capacity}</span>
                    </div>
                    <div className="product-card__spec">
                      <span>RAM</span>
                      <span>{product.ram}</span>
                    </div>
                  </div>

                  <div className="product-card__actions">
                    <AddToCartButton
                      productSummary={product}
                      productDetails={cardDetails}
                      selectedImage={product.image}
                      className="product-card__add-btn"
                      onClick={e => e.preventDefault()}
                    />
                    <button
                      type="button"
                      className={`product-card__favorite-btn ${
                        isFav ? 'product-card__favorite-btn--active' : ''
                      }`}
                      aria-label="Add to favorites"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavourite(product.itemId);
                      }}
                    >
                      <img
                        src={
                          isFav
                            ? './img/FavouritesFilled.svg'
                            : './img/love.svg'
                        }
                        alt="Favorites"
                        className="product-card__love-icon"
                      />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="pagination__btn pagination__btn--arrow"
                disabled={currentPage === 1}
                onClick={() =>
                  handleParamChange('page', String(currentPage - 1))
                }
              >
                <img
                  className="products-slider__icon"
                  src="./img/VectorBack.svg"
                  alt="Previous"
                />
              </button>

              <div className="pagination__pages">
                {pageNumbers.map(page => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination__btn ${
                      page === currentPage ? 'pagination__btn--active' : ''
                    }`}
                    onClick={() => handleParamChange('page', String(page))}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="pagination__btn pagination__btn--arrow"
                disabled={currentPage === totalPages}
                onClick={() =>
                  handleParamChange('page', String(currentPage + 1))
                }
              >
                <img
                  className="products-slider__icon"
                  src="./img/VectorNext.svg"
                  alt="Next"
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
