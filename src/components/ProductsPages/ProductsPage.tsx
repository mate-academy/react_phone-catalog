import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import ProductPage from '../homePage/ProductPage/ProductPage';
import { getProducts } from '../../helpers/api';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Selectors from '../Selectors/Selectors';
import Pagination from '../Pagination/Pagination';
import './ProductsPage.scss';
import Spinner from '../Spinner/Spinner';
import ProductsList from '../ProductsList/ProductsList';

type Param = {
  item: string | undefined;
};

const ProductsPage = () => {
  const params: Param = useParams();
  const history = useHistory();
  const location = useLocation();
  const { pathname, search } = location;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gadgetsFromServer, setGadgetsFromServer] = useState<Gadget[]>([]);
  const urlSearchParams = new URLSearchParams(location.search);
  const searchQuery = urlSearchParams.get('searchQuery') || '';
  const sortQuery = urlSearchParams.get('sortQuery');

  useEffect(() => {
    setIsLoading(false);
    getProducts().then(data => {
      setGadgetsFromServer(data.filter((gadget: Gadget) => {
        return pathname.includes(gadget.type);
      }));
      setIsLoading(true);
    });
  }, []);

  useEffect(() => {
    if (params.item === undefined) {
      urlSearchParams.set('paginationQuery', 'All');
      urlSearchParams.set('page', '1');
      history.push({
        search: urlSearchParams.toString(),
      });
    }
  }, []);

  useEffect(() => {
    if (!params.item) {
      if (!urlSearchParams.get('paginationQuery')) {
        urlSearchParams.set('paginationQuery', 'All');
        urlSearchParams.set('page', '1');
        history.push({
          search: urlSearchParams.toString(),
        });
      }
    }
  }, [pathname, search]);

  const itemPerPage = () => {
    if (urlSearchParams.get('paginationQuery') === 'All') {
      return gadgetsFromServer.length;
    }

    return Number(urlSearchParams.get('paginationQuery'));
  };

  let comparator: (a: Gadget, b: Gadget) => number = () => 0;

  const sortGadgets = () => {
    if (sortQuery === 'Newest') {
      return (a: Gadget, b: Gadget): number => (a.age - b.age);
    }

    if (sortQuery === 'Alphabetically') {
      return (a: Gadget, b: Gadget): number => (a.id.localeCompare(b.id));
    }

    return (a: Gadget, b: Gadget): number => (
      (a.price - (a.price * (a.discount / 100)))
      - (b.price - (b.price * (b.discount / 100)))
    );
  };

  comparator = sortGadgets();

  const preparedGadgets = () => {
    return gadgetsFromServer.filter((gadget: Gadget) => (
      gadget.id.includes(searchQuery.toLowerCase())
    )).sort(comparator)
      .slice(
        (Number(urlSearchParams.get('page')) - 1)
        * itemPerPage(),
        Number(urlSearchParams.get('page'))
        * itemPerPage(),
      );
  };

  return (
    <>
      { params.item
        ? <ProductPage currentProduct={params.item} />
        : (isLoading
          ? (
            <div className="productsPage">

              <BreadCrumbs />

              <div>
                {pathname.replace('/', '') === 'phone'
                  ? (
                    <h1 className="productsPage__header">
                      Mobile phone
                    </h1>
                  )
                  : pathname.replace('/', '') === 'tablet'
                    ? (
                      <h1 className="productsPage__header">
                        Tablets
                      </h1>
                    )
                    : (
                      <h1 className="productsPage__header">
                        Accessories
                      </h1>
                    )}
              </div>

              <p className="productsPage__totalCount">
                {`${gadgetsFromServer.length} models`}
              </p>

              <div className="productsPage__dropdown">
                <Selectors />
              </div>

              <ProductsList gadgets={preparedGadgets()} />

              {
                (urlSearchParams.get('paginationQuery') !== 'All'
                  || Number(urlSearchParams.get('paginationQuery')) < gadgetsFromServer.length)
                && (
                  <div
                    className="productsPage__pagination"
                  >
                    <Pagination totalGadgets={gadgetsFromServer.length} />
                  </div>
                )
              }
            </div>
          )
          : (
            <Spinner />
          )
        )}
    </>
  );
};

export default ProductsPage;
