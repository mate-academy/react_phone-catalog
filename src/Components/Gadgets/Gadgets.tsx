/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Header } from '../Header/Header';
import { ProductList } from '../ProductList/ProductList';
import { useFetch } from '../../hooks/useFetch';
import { Phone } from '../../types/Phone';
import { Pagination } from '../Pagination/Pagination';
import './Gadgets.scss';

type Props = {
  pageDescription: string[];
  searchInput?: string;
};

export const Gadgets: React.FC<Props> = ({ pageDescription, searchInput }) => {
  const { getFetch } = useFetch();
  const [gadgetCatalog, setGadgetCatalog] = useState<Phone[]>([]);
  const [searchParams] = useSearchParams();
  const [sortByParam, setSortByParam] = useState(searchParams.get('sort'));
  const [perPageParam, setPerPageParam] = useState(searchParams.get('perPage'));
  const [gadgetCatalogCopy, setGadgetCatalogCopy]
  = useState<Phone[] | null>(null);
  const [pageSelected, setPageSelected] = useState(1);
  const location = useLocation();

  console.log(searchInput);

  useEffect(() => {
    getFetch()
      .then(res => {
        if (res) {
          setGadgetCatalog(res);
        } else {
          setGadgetCatalog([]);
        }
      })
      .catch(err => {
        console.warn(err.message);
      });
  }, []);

  useEffect(() => {
    setPageSelected(1);

    if (gadgetCatalog.length > 0) {
      let catalog = gadgetCatalog
        .filter(el => el.type === pageDescription[2])
        .sort((a, b) => {
          switch (sortByParam) {
            case 'price':
              return a.price - b.price;
            case 'name':
              return a.name.localeCompare(b.name);
            case 'age':
              return a.age - b.age;
            default:
              return 0;
          }
        });

      if (searchInput && searchInput !== '') {
        catalog = catalog
          .filter(el => el.name.toLowerCase().includes(searchInput));

        console.log(catalog);
      }

      setGadgetCatalogCopy(catalog);
    }
  }, [gadgetCatalog, sortByParam, perPageParam, searchInput]);

  return (
    <div className="Gadgets">
      <div className="Gadgets__wrapper">
        <Header
          pageDescription={pageDescription}
          setSortByParam={setSortByParam}
          setPerPageParam={setPerPageParam}
          numberOfProducts={`${gadgetCatalogCopy?.length}`}
        />
        {
          gadgetCatalogCopy && gadgetCatalogCopy.length > 0 ? (
            <>
              <ProductList
                productCatalogCopy={gadgetCatalogCopy}
                perPageParam={perPageParam}
                pageSelected={pageSelected}
              />
              <Pagination
                pageSelected={pageSelected}
                setPageSelected={setPageSelected}
                perPageParam={perPageParam}
                catalogLength={gadgetCatalogCopy?.length}
              />
            </>
          ) : (
            <>
              {
                location.pathname === '/accessories' && (
                  <div className="Gadgets__empty">
                    <h1 className="Gadgets__emtyText">Out of stock !</h1>
                  </div>
                )
              }
              {
                location.pathname !== '/accessories'
                && gadgetCatalogCopy
                && gadgetCatalogCopy.length === 0 && (
                  <div className="Gadgets__empty">
                    <h1 className="Gadgets__noSearchRes">No search results</h1>
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </div>
  );
};
