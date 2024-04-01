import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../Components/Loader/Loader';
import { Pagination } from '../../Components/Pagination/Pagination';
import { getAccessories } from '../../helper/api';
import { getSearchWith } from '../../helper/searchHelper';
import { useContext, useEffect, useState } from 'react';
import '../ProductPages/Pages.scss';
import { ProductContext } from '../../helper/ProductContext';

export const AccessoriesPage = () => {
  const { accessAmount, setAccessAmount, accessories, setAccessories } =
    useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';

  const option = ['4', '8', '16', 'all'];

  function setSearchWith(param: any) {
    const search = getSearchWith(searchParams, param);

    setSearchParams(search);
  }

  const onArrowClick = (value: number) => {
    setSearchWith({ page: value.toString() });
  };

  const onClickPage = (page: string) => {
    if (currentPage !== page) {
      setSearchWith({ page: page.toString() });
    }
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.currentTarget.value;

    setSearchWith({ sort: selectedValue });
  };

  const selectPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.currentTarget.value;

    if (selectedValue) {
      setSearchWith({ perPage: selectedValue });
    }
  };

  useEffect(() => {
    setLoading(true);
    getAccessories()
      .then(setAccessories)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="productPage">
      <div className="productPage__items">
        <div className="productPage__headings">
          <h1 className="productPage__title">Accessories</h1>
          <p className="productPage__text">{`${accessAmount} models`}</p>
        </div>

        <div className="productPage__selecting">
          <div className="productPage__select-container">
            <label
              className="productPage__small-text"
              htmlFor="ProductPageSelector"
            >
              Sort by
            </label>
            <select
              className="productPage__select"
              onChange={selectHandler}
              defaultValue="Newest"
              id="ProductPageSelector"
            >
              <option className="productPage__option" value="age">
                Newest
              </option>
              <option className="productPage__option" value="name">
                Alphabetically
              </option>
              <option className="productPage__option" value="price">
                Cheapest
              </option>
            </select>
          </div>

          <div className="productPage__select-container" data-cy="pagination">
            <label
              className="productPage__small-text"
              htmlFor="productPagePagination"
            >
              items on page
            </label>

            <select
              className="productPage__select"
              data-cy="pagination"
              id="productPagePagination"
              onChange={selectPerPage}
              defaultValue={8}
            >
              {option.map(opt => (
                <option value={opt} key={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Pagination
        onChangeProducts={newAccessories => {
          setAccessAmount(newAccessories);
        }}
        products={accessories}
        sort={sort}
        perPage={perPage}
        currentPage={currentPage}
        onClickPage={onClickPage}
        onArrowClick={onArrowClick}
      />
    </div>
  );
};
