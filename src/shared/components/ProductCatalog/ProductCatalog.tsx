import { useEffect, useMemo, useState } from 'react';
import { Dropdown } from '../Dropdown';
import { CardTemplate } from '../CardTemplate';
import { Pagination } from '../Pagination';
import { fetchJson } from '../../../api-func';
import { Product } from '../../../types/Product';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../Container';
import { ThreeDots } from 'react-loader-spinner';
import s from './ProductCatalog.module.scss';
import { Navigation } from '../Navigation';
import { useSearch } from '../../utils/SearchContext';

interface ProductCatalogProps {
  apiEndpoint: string;
  title: string;
}

export const ProductCatalog = ({ apiEndpoint, title }: ProductCatalogProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery } = useSearch();

  const sortType = searchParams.get('sort') || 'Newest';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const currPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await fetchJson('products');

        if (!allProducts) {
          throw new Error('Failed to fetch products');
        }

        const filteredByCategory = allProducts.filter(
          (product: Product) => product.category === apiEndpoint,
        );

        setProducts(filteredByCategory);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [apiEndpoint]);

  const totalPages = useMemo(() => {
    return itemsPerPage === 'All'
      ? 1
      : Math.ceil(products.length / parseInt(itemsPerPage));
  }, [products, itemsPerPage]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortType) {
        case 'Newest':
          return b.year - a.year;
        case 'Alphabetically':
          return a.name.localeCompare(b.name);
        case 'Cheapest':
          return a.fullPrice - b.fullPrice;
        default:
          return 0;
      }
    });
  }, [products, sortType]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let searchedProducts = sortedProducts;

    if (query) {
      searchedProducts = sortedProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (itemsPerPage === 'All') {
      return searchedProducts;
    }

    return searchedProducts.slice(
      (currPage - 1) * parseInt(itemsPerPage),
      currPage * parseInt(itemsPerPage),
    );
  }, [sortedProducts, searchQuery, itemsPerPage, currPage]);

  const updateSearchParams = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const validPage = Math.min(Math.max(page, 1), totalPages);

    updateSearchParams({ page: validPage });
  };

  const handleItemsPerPageChange = (items: string) => {
    updateSearchParams({
      perPage: items,
      page: 1,
    });
  };

  const handleSortChange = (sort: string) => {
    updateSearchParams({
      sort,
      page: 1,
    });
  };

  return (
    <section className={s.PhonePage}>
      <Container>
        <div className={s.PageContent}>
          <Navigation address={apiEndpoint} />

          <h2 className={s.PageTitle}>{title}</h2>

          <p className={s.PageText}>
            {products.length !== 0
              ? products.length !== 1
                ? `${products.length} models`
                : '1 model'
              : 'no models'}
          </p>

          <div className={s.DropdownField}>
            <Dropdown
              label="Sort by"
              options={['Newest', 'Alphabetically', 'Cheapest']}
              selectedValue={sortType}
              onChange={handleSortChange}
            />

            <Dropdown
              label="Items on page"
              options={['4', '8', '16', 'All']}
              selectedValue={itemsPerPage}
              onChange={handleItemsPerPageChange}
            />
          </div>

          {isLoading ? (
            <div className={s.Loader}>
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#313131"
                ariaLabel="three-dots-loading"
              />
            </div>
          ) : (
            <ul className={s.PhoneCatalog}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <CardTemplate
                    product={product}
                    productId={product.itemId}
                    discount={false}
                    key={product.itemId}
                  />
                ))
              ) : (
                <p>{`No products found.`}</p>
              )}
            </ul>
          )}

          {itemsPerPage !== 'All' && totalPages > 1 && (
            <Pagination
              currentPage={currPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </Container>
    </section>
  );
};
