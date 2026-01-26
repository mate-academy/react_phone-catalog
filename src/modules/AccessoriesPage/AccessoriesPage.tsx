import React, { useEffect, useState } from "react";
import styles from "../AccessoriesPage/AccessoriesPage.module.scss";
import { NavLink } from "react-router-dom";
import { Product } from "../shared/types/Product";
import { ProductsList } from "../../components/ProductsList";
import { Loader } from "../../components/Loader";

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const step = 14;
  const [visibleCount, setVisibleCount] = useState<number>(step);
  const [sortBy, setSortBy] = useState<string>("alphabetically");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(accessories.length / visibleCount);


  useEffect(() => {
    const fetchAccessories = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('./api/accessories.json');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();

        const normalized = data.map((product: any) => ({
          ...product,
          image: product.images?.[0] || product.image,
          price: product.priceDiscount || product.price,
          fullPrice: product.priceRegular || product.fullPrice,
        }));

        setAccessories(normalized);
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    };

    fetchAccessories();
  }, []);

  const sortedAccessories = [...accessories].sort((a, b) => {
    if (sortBy === "alphabetically") return a.name.localeCompare(b.name);
    if (sortBy === "cheapest") return a.price - b.price;
    if (sortBy === "expensive") return b.price - a.price;

    return 0;
  });

  const visibleAccessories = sortedAccessories.slice(
    (currentPage - 1) * visibleCount,
    currentPage * visibleCount
  )

  const visiblePagesCount = 4;
  let start = Math.max(1, currentPage - 1);
  let end = start + visiblePagesCount - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visiblePagesCount + 1);
  }

  const neadedPages = Array.from({ length: end - start + 1}, (_, i) => start + i);

  const handlePrev = () => {
    if (currentPage > 1) return setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) return setCurrentPage(prev => prev + 1);
  }

  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <>
      <div className={styles["accessories-page"]}>
        <div className={styles["accessories-page__navi"]}>
          <NavLink to="/" className={styles["accessories-page__block"]}>
            <img src="./img/home.png" alt="logo" className={styles["accessories-page__logo"]}/>
          </NavLink>
          <img src="./img/r-shevron.png" alt="logo" className={styles["accessories-page__arrow"]}/>
          <p className={styles["accessories-page__page"]}>Accessories</p>
        </div>
        <h1 className={styles["accessories-page__title"]}>Accessories</h1>
        <p className={styles["accessories-page__models"]}>{accessories.length} models</p>
        <div className={styles["accessories-page__container"]}>
          <div className={styles["accessories-page__select"]}>
            <p className={styles["accessories-page__select__title"]}>Sort by</p>
            <select
            className={styles["accessories-page__select__field"]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            >
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheap</option>
            <option value="expensive">Expensive</option>
            </select>
          </div>
          {visibleCount < accessories.length && (
          <div className={styles["accessories-page__select"]}>
            <p className={styles["accessories-page__select__title"]}>Items on page</p>
            <select
              className={styles["accessories-page__select__field"]}
              value={visibleCount}
              onChange={(e) => setVisibleCount(Number(e.target.value))}
            >
            <option value={14}>14</option>
            <option value={18}>18</option>
            <option value={22}>22</option>
            <option value={accessories.length}>All</option>
            </select>
          </div>
        )}
        </div>
        <div className={styles["accessories-page__phones"]}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className={styles["accessories-page__error"]}>Error: {error}</div>
          ) : (
             <ProductsList products={visibleAccessories} />
          )}
        </div>
        <div className={styles["accessories-page__buttons"]}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`${styles["accessories-page__buttons__left"]} ${styles["accessories-page__buttons__button"]}`}
          >
            &lt;{/*<*/}
          </button>

          {neadedPages.map((page) => (
            <button
              key={page}
              className={`${styles["accessories-page__buttons__nbutton"]} ${page === currentPage ? styles["accessories-page__buttons__active"] : ""}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`${styles["accessories-page__buttons__right"]} ${styles["accessories-page__buttons__button"]}`}
          >
            &gt;{/*>*/}
          </button>
        </div>
      </div>
    </>
  )
}
