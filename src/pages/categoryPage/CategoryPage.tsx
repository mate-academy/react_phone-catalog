import CardItem from "../../shared/CardItem";
import { useEffect, useMemo, useState } from "react";
import { ProductService } from "../../services/product.service";
import { IProductCard } from "../../interfaces/ProductCard.interface";
import { CategoryType } from "../../enums/CategoryType";
import Pagination from "../../shared/Pagination";
import styles from './CategoryPage.module.scss';
import DropdownCout from "../../shared/Dropdowns/DropdownCout";
import DropdownSort from "../../shared/Dropdowns";
import { sortProducts } from "../../helpers/sortProducts";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../shared/Breadcrumbs";
import Loader from "../../shared/Loader";

const CategoryPage: React.FC<{ category: CategoryType }> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [sort, setSort] = useState<string>('Newest');
  const [perPage, setPerPage] = useState<string>('8');
  const [currentPage, setCurrentPage] = useState<string>('1');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const totalPages = useMemo(() => Math.ceil(products.length / +perPage), 
    [perPage, products.length]);
  
  const sortedProducts = useMemo(() => sortProducts(sort, products), [sort, products]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const startIndex = (+currentPage - 1) * +perPage;
    const endIndex = startIndex + +perPage;
    
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, perPage]);
  
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    const updatedSort = searchParams.get('sort') || 'Newest';
    const updatedPerPage = searchParams.get('perPage') || '8';
    const updatedPage = searchParams.get('page') || '1';
  
    setSort(updatedSort);
    setPerPage(updatedPerPage);
    setCurrentPage(updatedPage);
  
    let shouldUpdate = false;

    if (!searchParams.get('sort')) {
      newParams.set('sort', 'Newest');
      shouldUpdate = true;
    }

    if (!searchParams.get('perPage')) {
      newParams.set('perPage', '8');
      shouldUpdate = true;
    }

    if (!searchParams.get('page')) {
      newParams.set('page', '1');
      shouldUpdate = true;
    }
  
    if (shouldUpdate) {
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams]);  

  useEffect(() => {
    const fetchData = async () => { 
      setIsLoading(true);

      try {
        if (category) {
          await new Promise(resolve => setTimeout(resolve, 300));

          const data = await ProductService.getByCategory(category); 
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products by category:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [category]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs categoryName={category} />

          <div className={styles.title}>
            <h1>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <h4>{`${products.length} models`}</h4>
          </div>

          <div className={styles.content}>
            <div className={styles.content__dropdown}>
              <DropdownSort />
              <DropdownCout />
            </div>

            <div className={styles.cards}>
              {visibleProducts.map((product) => (
                <CardItem product={product} key={product.id} />
              ))}
            </div>
          </div>
        </>
      )}

      {perPage !== 'all' && (
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage}
          searchParams={searchParams} 
          setSearchParams={setSearchParams} 
        />
      )}
    </div>
  );
}

export default CategoryPage;
