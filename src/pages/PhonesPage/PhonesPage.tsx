/* eslint-disable @typescript-eslint/indent */
import './PhonesPage.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { Filters } from '../../components/Filters';
import { Product } from '../../types/Product';
import { getPhones } from '../../api/products';
import { Pagination } from '../../components/Pagination';
import { FilterItems } from '../../types/FilterItems';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults';
import { getCorrectArrayProducts } from '../../helpers/getCorrectArrayProducts';

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();

  const searchPage = searchParams.get('page') || 1;
  const filter = searchParams.get('sort') || 'age';
  const count = searchParams.get('perPage') || 'all';
  const search = searchParams.get('query') || '';

  const [phones, setPhones] = useState<[] | Product[]>([]);
  const [filterItem, setFilterItem] = useState<FilterItems>({
    filter,
    count,
  });

  const [searchedPhones, setSearchedPhones] = useState<Product[]>(phones);

  const [filteredPhones, setFilteredPhones] = useState<[] | Product[]>([]);
  const [currentPage, setCurrentPage] = useState(+searchPage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPhones()
      .then(products => {
        setPhones(products);

        if (search && search.length > 0) {
          setSearchedPhones(
            products.filter(phone =>
              phone.name.toLowerCase().includes(search.toLowerCase()),
            ),
          );
        } else {
          setSearchedPhones(products);
        }

        setFilteredPhones(
          getCorrectArrayProducts(searchedPhones, filterItem, currentPage),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (search && search.length > 0) {
      setSearchedPhones(
        phones.filter(phone =>
          phone.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );

      return;
    }

    setSearchedPhones(phones);
  }, []);

  useEffect(() => {
    setFilteredPhones(
      getCorrectArrayProducts(searchedPhones, filterItem, currentPage),
    );
  }, [filterItem, currentPage, searchedPhones]);

  useEffect(() => {
    if (search && search.length > 0) {
      setSearchedPhones(
        phones.filter(phone =>
          phone.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );

      return;
    }

    setSearchedPhones(phones);
  }, [search]);

  return (
    <div className="phonesPage">
      {filteredPhones.length === 0 && !isLoading && (
        <NoResults categoryName="Mobile Phones" />
      )}

      {isLoading && filteredPhones.length > 0 && (
        <div className="phonesPage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && filteredPhones.length > 0 && (
        <>
          <div className="phonesPage__link">
            <div className="icon icon--home" />
            <div className="icon icon--arrow-right--disabled" />
            <div className="phonesPage__link-text">Phones</div>
          </div>

          <h1 className="phonesPage__title">Mobile phones</h1>

          <p className="phonesPage__text">{`${phones.length} models`}</p>

          <div className="phonesPage__filters">
            <Filters setFilterItem={setFilterItem} filterItem={filterItem} />
          </div>

          <div className="phonesPage__list">
            <ProductsList products={filteredPhones} />
          </div>

          {filterItem.count !== 'all' &&
            searchedPhones.length > +filterItem.count && (
              <div className="phonesPage__pagination">
                <Pagination
                  productsLength={searchedPhones.length}
                  countLength={filterItem.count}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
        </>
      )}
    </div>
  );
};
