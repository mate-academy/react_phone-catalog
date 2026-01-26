import React, { useEffect, useState } from "react";
import { ProductsList } from "../../components/ProductsList.tsx";
import { Loader } from "../../components/Loader/Loader.js";
import styles from "./PhonesPage.module.scss";
import { NavLink } from "react-router-dom";
import { Product } from "../shared/types/Product";
export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const step = 14;
  const [visibleCount, setVisibleCount] = useState<number>(step);
  const [sortBy, setSortBy] = useState<string>('newest');

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(phones.length / visibleCount);

 useEffect(() => {
  const fetchPhones = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/phones.json')
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
      const data = await response.json()

      const normalized = data.map((product: any) => ({
        ...product,
        image: product.images?.[0] || product.image,
        price: product.priceDiscount || product.price,
        fullPrice: product.priceRegular || product.fullPrice,
      }));

      setPhones(normalized);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

    fetchPhones();
  }, []);


  const sortedPhones = [...phones].sort((a, b) => {
    if (sortBy === "newest") return b.year - a.year;
    if (sortBy === "cheapest") return a.price - b.price;
    if (sortBy === "expensive") return b.price - a.price;

    return 0;
  });

  const visiblePhones = sortedPhones.slice(
    (currentPage - 1) * visibleCount,
    currentPage * visibleCount
  );

  const visiblePagesCount = 4;
  let start = Math.max(1, currentPage - 1);
  let end = start + visiblePagesCount - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visiblePagesCount + 1);
  }
  const neadedPages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <>
      <div className={styles["phones-page"]}>
        <div className={styles["phones-page__navi"]}>
          <NavLink to="/" className={styles["phones-page__block"]}>
            <img src="./img/home.png" alt="logo" className={styles["phones-page__logo"]}/>
          </NavLink>
          <img src="./img/r-shevron.png" alt="logo" className={styles["phones-page__arrow"]}/>
          <p className={styles["phones-page__page"]}>Phones</p>
        </div>
        <h1 className={styles["phones-page__title"]}>Mobile phones</h1>
        <p className={styles["phones-page__models"]}>{phones.length} models</p>
        <div className={styles["phones-page__container"]}>
          <div className={styles["phones-page__select"]}>
            <p className={styles["phones-page__select__title"]}>Sort by</p>
            <select
            className={styles["phones-page__select__field"]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            >
            <option value="newest">Newest</option>
            <option value="cheapest">Cheap</option>
            <option value="expensive">Expensive</option>
            </select>
          </div>
          {visibleCount < phones.length && (
          <div className={styles["phones-page__select"]}>
            <p className={styles["phones-page__select__title"]}>Items on page</p>
            <select
              className={styles["phones-page__select__field"]}
              value={visibleCount}
              onChange={(e) => setVisibleCount(Number(e.target.value))}
            >
            <option value={14}>14</option>
            <option value={18}>18</option>
            <option value={22}>22</option>
            <option value={phones.length}>All</option>
            </select>
          </div>
        )}
        </div>
        <div className={styles["phones-page__phones"]}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className={styles["phones-page__error"]}>Error: {error}</div>
          ) : (
             <ProductsList products={visiblePhones} />
          )}
        </div>
        <div className={styles["phones-page__buttons"]}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`${styles["phones-page__buttons__left"]} ${styles["phones-page__buttons__button"]}`}
          >
            &lt;{/*<*/}
          </button>

          {neadedPages.map((page) => (
            <button
              key={page}
              className={`${styles["phones-page__buttons__nbutton"]} ${page === currentPage ? styles["phones-page__buttons__active"] : ""}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`${styles["phones-page__buttons__right"]} ${styles["phones-page__buttons__button"]}`}
          >
            &gt;{/*>*/}
          </button>
        </div>
      </div>
    </>
  )
}
