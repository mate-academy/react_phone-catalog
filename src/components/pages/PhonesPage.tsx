/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useMemo,
  // useMemo,
} from 'react';

// import classNames from 'classnames';
// import ProductCard from '../ProductCard';
import { ProductType, getProductsWithType } from '../../api/getProducts';
import { Product } from '../../types/Phone';
import '../../styles/pages.scss/PhonesPage.scss';
// import { IconSlideLeft, IconSlideRight } from '../../utils/SliderIcons';
import ProductsCatalog from '../ProductsCatalog';
import NoProductsMessage from '../NoProductsMessage';
import { CatalogProps } from '../../types/CatalogProps';
import { filteredProductsByName } from '../../utils/filterProductsByName';
import Loader from '../Loader';

const PhonesPage: React.FC<CatalogProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const title = 'Mobile phones';

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProductsWithType(ProductType.PHONE).then(productsFromApi => setProducts(productsFromApi)).finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = useMemo(() => filteredProductsByName(products, searchQuery), [searchQuery, products]);

  return (
    !isLoading
      ? (
        products.length > 0
          ? (
            <ProductsCatalog
              title={title}
              products={filteredProducts}
            />
          ) : (
            <NoProductsMessage title={title} />
          )
      ) : (
        <Loader />
      )
  );
  // const [productsPerPage, setProductsPerPage] = useState<number>(16);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // useEffect(() => {
  //   getProductsWithType(ProductType.PHONE).then(productsFromApi => setProducts(productsFromApi));
  // }, []);

  // const currentIndex = useMemo(() => {
  //   if (currentPage === 1) {
  //     return 0;
  //   }

  //   return (currentPage - 1) * productsPerPage;
  // }, [currentPage, productsPerPage]);
  // const visibleProducts = useMemo(() => products.slice(currentIndex, currentIndex + productsPerPage), [products, currentPage, productsPerPage]);

  // const buttons = useMemo(() => {
  //   return Array.from({ length: products.length / productsPerPage }, (_, index) => index + 1);
  // }, [visibleProducts, productsPerPage]);

  // return (
  //   <main className="main-catalog container">
  //     <section className="section-catalog">

  //       <h1 className="section-catalog__title" onClick={() => setCurrentPage(currentPage + 1)}>
  //         Mobile phones
  //       </h1>

  //       <p className="section-catalog__caption">
  //         {`${products.length} models`}
  //       </p>

  //       <div className="section-catalog__items-displaying">
  //         <label htmlFor="sort" className="section-catalog__items-displaying--wrapper">
  //           Sort by

  //           <select
  //             name="sort-order"
  //             id="sort"
  //             className="section-catalog__items-displaying--select"
  //           >
  //             <option value="age">Newest</option>
  //             <option value="name">Alphabetically</option>
  //             <option value="price-asc">Cheapest</option>
  //             <option value="price-desc">Most expensive</option>
  //           </select>
  //         </label>

  //         <label htmlFor="amount" className="section-catalog__items-displaying--wrapper">
  //           Items on page

  //           <select
  //             name="amount"
  //             id="amount"
  //             className="section-catalog__items-displaying--select"
  //             defaultValue={productsPerPage.toString()}
  //             onChange={(event) => setProductsPerPage(+event.target.value || products.length)}
  //           >
  //             <option value="4">4</option>
  //             <option value="8">8</option>
  //             <option value="16">16</option>
  //             <option value="All ">All</option>
  //           </select>
  //         </label>
  //       </div>

  //       <div className="section-catalog__products catalog">
  //         {visibleProducts.map(product => (
  //           <ProductCard key={product.id} product={product} />
  //         ))}
  //       </div>

  //       {true
  //       && (
  //         <div className="section-catalog__pagination">
  //           <button
  //             className="slider-button"
  //             type="button"
  //             disabled={currentPage === 1}
  //             onClick={() => setCurrentPage(currentPage - 1)}
  //           >
  //             <IconSlideLeft />
  //           </button>

  //           <div className="section-catalog__pagination--wrapper">
  //             {buttons.map(button => (
  //               <button
  //                 key={button}
  //                 type="button"
  //                 onClick={() => setCurrentPage(button)}
  //                 className={`page-button${classNames({ ' button-is-active': currentPage === button })}`}
  //               >
  //                 {button}
  //               </button>
  //             ))}
  //           </div>

  //           <button
  //             className="slider-button"
  //             type="button"
  //             disabled={currentPage === buttons.length}
  //             onClick={() => setCurrentPage(currentPage + 1)}
  //           >
  //             <IconSlideRight />
  //           </button>
  //         </div>
  //       )}

  //     </section>
  //   </main>
  // );
};

export default PhonesPage;
