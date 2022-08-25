/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../../Components/Header/Header';
import { ProductList } from '../../Components/ProductList/ProductList';
import { useFetch } from '../../hooks/useFetch';
import { Phone } from '../../types/Phone';
import { Pagination } from '../../Components/Pagination/Pagination';
import './Phones.scss';

export const Phones = () => {
  const { getFetch } = useFetch();
  const [phoneCatalog, setPhoneCatalog] = useState<Phone[]>([]);
  const [searchParams] = useSearchParams();
  const [sortByParam, setSortByParam] = useState(searchParams.get('sort'));
  const [perPageParam, setPerPageParam] = useState(searchParams.get('perPage'));
  const [phoneCatalogCopy, setPhoneCatalogCopy]
  = useState<Phone[] | null>(null);
  const [pageSelected, setPageSelected] = useState(1);

  useEffect(() => {
    getFetch()
      .then(res => {
        setPhoneCatalog(res);
      })
      .catch(err => {
        console.warn(err.message);
      });
  }, []);

  useEffect(() => {
    setPageSelected(1);

    const catalog = phoneCatalog
      .filter(el => el.type === 'phone')
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

    console.log(catalog);

    setPhoneCatalogCopy(catalog);
  }, [phoneCatalog, sortByParam, perPageParam]);

  return (
    <div className="Phones">
      <div className="Phones__wrapper">
        <Header
          setSortByParam={setSortByParam}
          setPerPageParam={setPerPageParam}
          numberOfProducts={`${phoneCatalogCopy?.length}`}
        />
        <ProductList
          phoneCatalogCopy={phoneCatalogCopy}
          perPageParam={perPageParam}
          pageSelected={pageSelected}
        />
        <Pagination
          pageSelected={pageSelected}
          setPageSelected={setPageSelected}
          perPageParam={perPageParam} //
          catalogLength={phoneCatalogCopy?.length} //
        />
      </div>
    </div>
  );
};
