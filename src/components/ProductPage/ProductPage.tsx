// import { useEffect, useRef, useState } from 'react';
import { ProductItem } from '../ProductItem/ProductItem';
import { MyDropdownItems, MyDropdownSortBy } from '../DropDown/DropDow';
import './ProductPage.scss';
import home from '../../../image/home.svg';
import arrow from '../../../image/arrow.svg';
import { useProductHooks } from './usePhonesHooks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product, ProductDetails } from '../../types/ProductTypes';
import { fetchProducts } from '../../utils/api';
import { Loader } from '../Loader/Loader';
import catGif from '../../../assets/cat.gif';

export const ProductPage = () => {
  const path = useLocation();
  const currentCategory = path.pathname.slice(1);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<ProductDetails[]>([]);
  const [itemsPrePage, setItemsPrePage] = useState<number | 'all'>(8);

  const {
    sortBy,
    loading,
    error,
    setError,
    currentPage,
    totalPages,
    setCurrentPage,
    // handleItemsChange,
    handleSortChange,
    // setItemPrevPage,
  } = useProductHooks();
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //завантажує товари з API і фільтрує за катергоріями
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        const validCategories = ['phones', 'tablets', 'accessories'];

        if (validCategories.includes(currentCategory)) {
          const filteredProducts = data.filter(
            (product: Product) => product.category === currentCategory,
          );

          setProducts(filteredProducts);
        } else {
          setProducts([]);
        }
      } catch {
        setError(
          `Oops, something went wrong, please check your connection 🫶💻`,
        );
      }
    };

    fetchData();

    // завантажує cart з localstorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(savedCart);
  }, [currentCategory, setError]);

  // console.log(sortBy);
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.year - a.year;
    }

    if (sortBy === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'Cheapest') {
      return a.fullPrice - b.fullPrice;
    }

    return a.name.localeCompare(b.name);
  });

  // console.log(sortBy, sortedProducts);

  const displayedProducts =
    itemsPrePage === 'all'
      ? sortedProducts
      : sortedProducts.slice(0, itemsPrePage);

  const handleItemsPrePageChange = (option: { value: string }) => {
    setItemsPrePage(option.value === 'all' ? 'all' : Number(option.value));
  };

  // const addToCard = (product: ProductDetails) => {
  //   setCart(prevCard => {
  //     const updatedCart = [...prevCard, product];

  //     localStorage.setItem('cart', JSON.stringify(updatedCart));

  //     return updatedCart;
  //   });
  // };

  return (
    <main className="main__phonepage">
      <div className="mobilelink">
        <img src={home} alt="mobilelink__home" />
        <span>
          <img src={arrow} alt="mobilelink__arrow" />
        </span>
        <p className="mobilelink__title">
          {currentCategory}
          {/* Phones */}
          {selectedPhone && (
            <>
              <span>
                <img src={arrow} alt="mobilelink__arrow" />
              </span>
              {selectedPhone}
            </>
          )}
        </p>
      </div>
      {error && (
        <div className="error__container">
          <img src={catGif} alt="Error" className="error__img" />
          <p className="error-message">
            Oops, something went wrong, please check your connection 🫶💻. Try
            again later ❤️.
          </p>
        </div>
      )}

      {!error && (
        <>
          <h1 className="page__title">
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </h1>
          <h1 className="mobile__models">{`${products.length} models`}</h1>
        </>
      )}

      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="mobile__choice">
            <div className="mobile__dropdown">
              <div className="mobile__sortby">
                <h3 className="sortby">Sort by</h3>
                <MyDropdownSortBy
                  onChange={option => {
                    handleSortChange(option.value);
                  }}
                />
              </div>
              <div className="mobile__items">
                <h3 className="item__page">Items on page</h3>
                <MyDropdownItems onChange={handleItemsPrePageChange} />
              </div>
            </div>
            <div className="mobile__cards">
              {displayedProducts.map((product: Product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  WithAdditionalPrice
                  onClick={() => setSelectedPhone(product.name)}
                  // addToCard={() => addToCard(product)}
                />
              ))}
            </div>
            <div className="mobile__buttons">
              <button
                className="mobile__buttonsbuttonPrev"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={`mobile__pagination ${currentPage === number ? 'active' : ''}`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </button>
              ))}
              <button
                className="mobile__buttonsbuttonNext"
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
