import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../TabletsPage/TabletsPage.module.scss";
import { Product } from "../shared/types/Product";
import { Loader } from "../../components/Loader/Loader.js";
import { ProductsList } from "../../components/ProductsList";
import { TABLETS_API } from "../shared/constants/constants";
import { fetchUrl } from "../shared/FetchFunction/FetchFunction";

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const step = 14;

  const [visibleCount, setVisibleCount] = useState<number>(step);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(tablets.length / visibleCount);

  useEffect(() => {
    const fetchTablets = async () => {
      setIsLoading(true);


      try {
        const data = await fetchUrl(TABLETS_API);

        const normalized = data.map((product: any) => ({
          ...product,
          image: product.images?.[0] || product.image,
          price: product.priceDiscount || product.price,
          fullPrice: product.priceRegular || product.fullPrice,
          productId: product.id,
        }));

        setTablets(normalized);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTablets();
  }, []);

  const sortedTablets = [...tablets].sort((a, b) => {
    if (sortBy === "newest") return a.year - b.year;
    if (sortBy === "expensive") return b.price - a.price;
    if (sortBy === "cheapest") return a.price - b.price;

    return 0;
  });

  const visibleTablets = sortedTablets.slice(
    (currentPage - 1) * visibleCount,
    currentPage * visibleCount
  );

  const visiblePagesCount = 4;
  let start = Math.max(1, currentPage - 1);
  let end = start + visiblePagesCount - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visiblePagesCount + 1)
  }

  const neededPage = Array.from({ length: end - start + 1}, (_, i) => start + i);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  }

  const goToPage = (page: number) => setCurrentPage(page);



  return (
      <>
      <div className={styles["tablets-page"]}>
        <div className={styles["tablets-page__navi"]}>
          <NavLink to="/" className={styles["tablets-page__block"]}>
            <img src="./img/home.png" alt="logo" className={styles["tablets-page__logo"]}/>
          </NavLink>
          <img src="./img/r-shevron.png" alt="logo" className={styles["tablets-page__arrow"]}/>
          <p className={styles["tablets-page__page"]}>Tablets</p>
        </div>
        <h1 className={styles["tablets-page__title"]}>Tablets</h1>
        <p className={styles["tablets-page__models"]}> models</p>
        <div className={styles["tablets-page__container"]}>
          <div className={styles["tablets-page__select"]}>
            <p className={styles["tablets-page__select__title"]}>Sort by</p>
            <select
              className={styles["tablets-page__select__field"]}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
            <option value="newest">Newest</option>
            <option value="cheapest">Cheap</option>
            <option value="expensive">Expensive</option>
            </select>
          </div>
          { visibleCount < tablets.length && (
          <div className={styles["tablets-page__select"]}>
            <p className={styles["tablets-page__select__title"]}>Items on page</p>
            <select
            className={styles["tablets-page__select__field"]}
            value={visibleCount}
            onChange={(e) => setVisibleCount(Number(e.target.value))}
            >
            <option value={14}>14</option>
            <option value={18}>18</option>
            <option value={22}>22</option>
            <option value={tablets.length}>All</option>
            </select>
          </div>
        )}
        </div>
        <div className={styles["tablets-page__phones"]}>
          {isLoading ? (
            <Loader/>
          ) : error ? (
            <div className={styles["tablets-page__error"]}>Error: {error}</div>
          ) : (
            <ProductsList products={visibleTablets} />
          )}
        </div>
        <div className={styles["tablets-page__buttons"]}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`${styles["tablets-page__buttons__left"]} ${styles["tablets-page__buttons__button"]}`}
          >
            &lt;{/*<*/}
          </button>

          {neededPage.map((page) => (
            <button
              key={page}
              className={`${styles["tablets-page__buttons__nbutton"]} ${page === currentPage ? styles["tablets-page__buttons__active"] : ""}`}
              onClick={() => goToPage(page)}
            >
            {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`${styles["tablets-page__buttons__right"]} ${styles["tablets-page__buttons__button"]}`}
          >
            &gt;{/*>*/}
          </button>
        </div>
      </div>
    </>
  )
}
