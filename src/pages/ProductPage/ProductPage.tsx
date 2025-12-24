import './ProductPage.scss';
import { ProductName } from '../../types/prodName';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DropDown } from '../../components/Dropdown';
import { GlobalContext } from '../../context/GlobalContext';
import { SortType } from '../../types/SortType';
import { ItemsOnPage } from '../../types/ItemsOnPageType';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { NaviLine } from '../../components/NaviLine';
import { Button } from '../../components/Button';
import { ProductsList } from '../../components/ProductsList';
import { useLocation } from 'react-router-dom';

type Props = {
  type: ProductName;
};

export const ProductPage: React.FC<Props> = ({ type }) => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Alphabetically);
  const [itemsOnPage, setItemsOnPage] = useState<ItemsOnPage>(ItemsOnPage.all);
  const [page, setPage] = useState(1);
  const { allProducts } = useContext(GlobalContext);

  const category = useLocation().pathname.slice(1);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => product.category === type);
  }, [type, allProducts]);

  const productsSort = (sortBy: SortType): Product[] => {
    switch (sortBy) {
      case SortType.Newest:
        return filteredProducts.sort((a, b) => b.year - a.year);
      case SortType.Cheapest:
        return filteredProducts.sort((a, b) => a.price - b.price);
      default:
        return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  useEffect(() => {
    setPage(1);
  }, [itemsOnPage, sortBy]);

  const visibleProducts = productsSort(sortBy);

  const itemsPerPage = itemsOnPage === ItemsOnPage.all
    ? visibleProducts.length
    : Number(itemsOnPage);
  
  const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);

  const currentProducts = visibleProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  ); 
  
  return (
    <div className="product-page">
      <div className="container">
        <div className="product-page__content">
          <div className="product-page__navi-line">
            <NaviLine category={type} />
          </div>

          <h1 className="product-page__title">
            {type === 'phones'
              ? `Mobile ${type}`
              : type[0].toUpperCase() + type.slice(1)}
          </h1>
          <span className="product-page__desc">{`${filteredProducts.length} models`}</span>

          <div className="product-page__drop-block">
            <DropDown<SortType>
              options={Object.values(SortType)}
              label='Sort by'
              selected={sortBy}
              onSelect={setSortBy}
            />
            <DropDown<ItemsOnPage>
              options={Object.values(ItemsOnPage)}
              label='Items on page'
              selected={itemsOnPage}
              onSelect={setItemsOnPage}
            />
          </div>

          <ProductsList
            products={currentProducts}
          />

          <div className="product-page__pagination">
            {/* <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            /> */}
          </div>

        </div>
      </div>
    </div>
  );
};

// type Props1 = {
//   page: number;
//   totalPages: number;
//   onChange: (pageNum: number) => void;
// }

// export const Pagination: React.FC<Props1> = ({
//   page,
//   totalPages,
//   onChange,
// }) => {
//   // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   const createPageList = () => {
//     const pages: (number | "...")[] = [];

//     // Always show 1
//     pages.push(1);

//     // Left dots
//     if (page > 4) {
//       pages.push("...");
//     }

//     // Middle pages
//     for (let p = page - 2; p <= page + 2; p++) {
//       if (p > 1 && p < totalPages) {
//         pages.push(p);
//       }
//     }

//     // Right dots
//     if (page < totalPages - 3) {
//       pages.push("...");
//     }

//     // Always show last
//     if (totalPages > 1) {
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   const pages = createPageList();
  
//   return (
//     <div className="pagination">
//       <Button 
//         className="button pag__btn--left"
//         disabled={page === 1}
//         currentPage={page}
//         onChange={(newPage) => onChange(newPage)}
//       />
//       {pages.map((p, i) => (
//         <Button 
//           key={i}
//           type="pagination"
//           className={`
//             button
//             pag__btn
//             ${p === page ? 'pag__btn--active' : ''}
//           `}
//           currentPage={p}
//           onChange={onChange} 
//         />
//       ))}
//       <Button
//         className="button pag__btn--right"
//         disabled={page === totalPages}
//         currentPage={page}
//         onChange={(newPage) => onChange(newPage)}
//       />
//     </div>
//   )
// }
