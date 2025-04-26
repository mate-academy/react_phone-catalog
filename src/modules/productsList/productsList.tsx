/* eslint-disable max-len */
import './productsList.scss';
import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { CustomSelect } from '../../components/select';
import phonesData from '../../../public/api/phones.json';
import tabletsData from '../../../public/api/tablets.json';
import accessoriesData from '../../../public/api/accessories.json';
import productsData from '../../../public/api/products.json';
import homeLogo from '../../images/catalog/home-logo.png';
import sliderRight from '../../images/catalog/slider-right.png';
import leftSliderDefault from '../../images/left-slider-default.png';
import rightSliderDefault from '../../images/right-slider-default.png';
import { Phone, Tablet, Accessory } from '../../types/product';
import { ProductCard } from '../../components/productCard';
import { mapToProductListItem } from '../../function/mapToProductListItem';
import { ProductListItem } from '../../types/product';
import { Loader } from '../../components/loader/loader';
import notFound from '../../../public/img/product-not-found.png';

type Product = Phone | Tablet | Accessory;

interface ProductsListProps {
  category: 'phones' | 'tablets' | 'accessories';
}

const phones: Phone[] = phonesData.map(phone => {
  const meta = productsData.find(product => product.itemId === phone.id);

  return {
    ...phone,
    category: 'phones' as const,
    year: meta?.year || 0,
  };
});

const tablets: Tablet[] = tabletsData.map(tablet => {
  const meta = productsData.find(product => product.itemId === tablet.id);

  return {
    ...tablet,
    category: 'tablets' as const,
    year: meta?.year || 0,
  };
});

const accessories: Accessory[] = accessoriesData.map(accessory => {
  const meta = productsData.find(product => product.itemId === accessory.id);

  return {
    ...accessory,
    category: 'accessories' as const,
    year: meta?.year || 0,
  };
});

const optionsSortBy = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const optionsItemBy = [
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 'All', label: 'All' },
];

const getMappedProducts = <T extends Product>(
  data: T[],
  category: T['category'],
) => data.map((item, i) => mapToProductListItem({ ...item, category } as T, i));

export const ProductsList: React.FC<ProductsListProps> = ({ category }) => {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(products.length);
  const [sortType, setSortType] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const query = searchParams.get('query')?.toLowerCase() || '';

  useEffect(() => {
    setCurrentPage(1);
    setItemsPerPage(0);
    setSortType('');
    setSearchParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setHasError(false);

      let mapped: ProductListItem[] = [];

      switch (category) {
        case 'phones':
          mapped = getMappedProducts<Phone>(phones, 'phones');
          setTitle('Mobile phones');
          break;
        case 'tablets':
          mapped = getMappedProducts<Tablet>(tablets, 'tablets');
          setTitle('Tablets');
          break;
        case 'accessories':
          mapped = getMappedProducts<Accessory>(accessories, 'accessories');
          setTitle('Accessories');
          break;
      }

      await new Promise(resolve => setTimeout(resolve, 300));
      setProducts(mapped);
      setIsLoading(false);
    };

    loadData();
  }, [category]);

  useEffect(() => {
    if (products.length > 0 && itemsPerPage === 0) {
      setItemsPerPage(products.length);
    }
  }, [products, itemsPerPage]);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (sortType) {
      params.sort = sortType;
    }

    if (currentPage > 1) {
      params.page = currentPage.toString();
    }

    if (itemsPerPage && itemsPerPage !== products.length) {
      params.perPage = itemsPerPage.toString();
    }

    const prevParams = Object.fromEntries(searchParams.entries());
    const areEqual = JSON.stringify(prevParams) === JSON.stringify(params);

    if (!areEqual) {
      setSearchParams(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, currentPage, itemsPerPage]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === 'newest') {
      return (b.year || 0) - (a.year || 0);
    } else if (sortType === 'alphabetically') {
      return a.name.localeCompare(b.name);
    } else if (sortType === 'cheapest') {
      return (a.price || a.fullPrice) - (b.price || b.fullPrice);
    }

    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    itemsPerPage === filteredProducts.length
      ? undefined
      : currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const maxVisiblePages = 5;

  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      totalPages - maxVisiblePages + 1,
    ),
  );
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="container">
      <div className="productList">
        <div className="productList__top">
          <NavLink to="/" className="productList__top--home">
            <img
              src={homeLogo}
              alt="Logo Home"
              className="productList__top--logoHome"
            />
          </NavLink>
          <img
            src={sliderRight}
            alt="Seta"
            className="productList__top--sliderRight"
          />
          <p className="productList__top--name">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
        </div>
        {isLoading && (
          <div className="productList__loading">
            <Loader />
          </div>
        )}
        {!isLoading && hasError && (
          <div className="productList__error">
            <p className="bodyText">Something went wrong.</p>
            <button onClick={() => window.location.reload()} className="button">
              Reload
            </button>
          </div>
        )}
        <div className="productList__title">
          <h1 className="h1">{title}</h1>
          <p className="bodyText">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'model' : 'models'}
          </p>
        </div>
        {!isLoading && !hasError && filteredProducts.length > 0 && (
          <>
            <div className="productList__check">
              <div className="productList__check--box productList__check--selectSortBy">
                <p className="productList__check--title">Sort by</p>
                <CustomSelect
                  options={optionsSortBy}
                  selectedValue={sortType || 'Select'}
                  onChange={value => setSortType(value as string)}
                />
              </div>
              <div className="productList__check--box">
                <p className="productList__check--title">Items on page</p>
                <CustomSelect
                  options={optionsItemBy}
                  selectedValue={
                    itemsPerPage === products.length ? 'All' : itemsPerPage
                  }
                  onChange={value => {
                    setItemsPerPage(
                      value === 'All' ? products.length : Number(value),
                    );
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="productList__products">
              {paginatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFullPrice={true}
                />
              ))}
            </div>
            <div className="productList__pagination">
              <button
                className="productList__pagination--left productList__pagination--default"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <img
                  src={leftSliderDefault}
                  alt="Left Slider"
                  className="productList__pagination--img"
                />
              </button>

              {visiblePages.map(page => (
                <button
                  key={page}
                  className={`productList__pagination--number ${
                    currentPage === page ? 'active' : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="productList__pagination--right productList__pagination--default"
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <img
                  src={rightSliderDefault}
                  alt="Left Slider"
                  className="productList__pagination--img"
                />
              </button>
            </div>
          </>
        )}
        {!isLoading && !hasError && query && filteredProducts.length === 0 && (
          <div className="no-results">
            <img src={notFound} alt="No results" className="no-results__img" />
            <p className="no-results__text h2">Product was not found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
