import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';
import { Products } from '../../../../helpers/types';
import { getPhones, getTablets, getAccessories } from '../../../../api/getProducts';
import { ProductCard } from '../../../Home/components/ProductCard/ProductCard';
import { NoResults } from '../NoResults/NoResults';
import './ProductsList.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

type ProductType = {
  productType: string;
};

export const ProductsList: React.FC<ProductType> = ({ productType }) => {
  const [products, setProducts] = useState<Products>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const history = useHistory();
  const sortBy = searchParams.get('sortBy') || 'age';
  const itemsOnPage = searchParams.get('itemsOnPage') || 'all';
  const currentPage = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const onSortChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('page', '1');
    searchParams.set(target.name, target.value);

    if (searchParams.get('itemsOnPage') === 'all'
    || Number(searchParams.get('itemsOnPage')) >= products.length) {
      searchParams.delete('page');
    }

    history.push(`?${searchParams.toString()}`);
  };

  const loadProducts = async () => {
    setLoading(true);
    let loadedProducts;

    switch (productType) {
      case 'Mobile phones':
        loadedProducts = await getPhones();
        break;
      case 'Tablets':
        loadedProducts = await getTablets();
        break;

      default: loadedProducts = await getAccessories();
        break;
    }

    setProducts(loadedProducts);
    setLoading(false);
  };

  const getVisibleProducts = () => {
    let sortedProducts;

    switch (sortBy) {
      case 'age':
        sortedProducts = products.sort((phoneA, phoneB) => phoneA.age - phoneB.age);
        break;

      case 'name':
        sortedProducts = products.sort((phoneA, phoneB) => phoneA.name.localeCompare(phoneB.name));
        break;

      default:
        sortedProducts = products.sort((phoneA, phoneB) => phoneA.price - phoneB.price);
    }

    const filteredProducts = sortedProducts
      .filter(product => product.name.toLowerCase().includes(query));

    if (itemsOnPage === 'all') {
      // const visibleProducts = sortedProducts
      //   .filter(product => product.name.toLowerCase().includes(query));

      return filteredProducts;
    }

    const firstIndexOfVisibleProducts = Number(currentPage) * Number(itemsOnPage)
     - Number(itemsOnPage);
    const lastIndexOfVisibleProducts = Number(currentPage) * Number(itemsOnPage);
    const visibleProducts = filteredProducts
      .slice(firstIndexOfVisibleProducts, lastIndexOfVisibleProducts);

    return visibleProducts;
  };

  const onNextPage = () => {
    const newPage = Number(currentPage) + 1;

    searchParams.set('page', newPage.toString());
    history.push(`?${searchParams.toString()}`);
  };

  const onPreviousPage = () => {
    const newPage = Number(currentPage) - 1;

    searchParams.set('page', newPage.toString());
    history.push(`?${searchParams.toString()}`);
  };

  const onCertainPage = (page: number) => {
    searchParams.set('page', page.toString());
    history.push(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (!products.length && !loading) {
    return <NoResults />;
  }

  return (
    <div className="ProductList">
      <Breadcrumbs />

      <div className="ProductList-TitleRow">
        <h1 className="ProductList-Title">{productType}</h1>
        <span className="ProductList-Quantity">
          {`${products.length} models`}
        </span>
      </div>

      {loading
        ? (
          <Loader />
        )
        : (
          <>
            <div className="Actions ProductList-Actions">
              <div className="Actions-Block">
                <span className="Actions-Name">Sort by</span>
                <select
                  value={sortBy}
                  name="sortBy"
                  className="Actions-Select"
                  onChange={onSortChange}
                >
                  <option value="age">Newest</option>
                  <option value="name">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </div>
              <div className="Actions-Block">
                <span className="Actions-Name">Items on page</span>
                <select
                  value={itemsOnPage}
                  name="itemsOnPage"
                  className="Actions-Select"
                  onChange={onSortChange}
                >
                  <option value="all">all</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </select>
              </div>
            </div>

            <div className="ProductList-List">
              {getVisibleProducts().map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              itemsOnPage={itemsOnPage}
              currentPage={currentPage}
              onNextPage={onNextPage}
              onPreviousPage={onPreviousPage}
              phones={products}
              onCertainPage={onCertainPage}
            />
          </>
        )}

    </div>
  );
};
