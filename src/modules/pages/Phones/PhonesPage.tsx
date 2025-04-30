import React, { useEffect, useState } from 'react';
import styles from './PhonesPage.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader';
import { getPhones } from '../../../utils/fetchClient';
import { Phone } from '../../../types/phone';
import ProductsList from '../../shared/components/ProductsList';
import CustomSelect from '../../shared/components/CustomSelect';
import Pagination from '../../shared/components/Pagination';

export const PhonesPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [phones, setPhones] = useState<[] | Phone[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || 1;
  const [selectOption, setSelectOption] = useState<string>();

  function changeSorting(e: string) {
    const newParams = new URLSearchParams(searchParams);

    setSelectOption(e);
    newParams.set('sort', e);
    setSearchParams(newParams);
  }

  useEffect(() => {
    changeSorting('age');
    async function loadPhones() {
      setLoader(true);

      try {
        const result = await getPhones();

        setPhones(result);
      } catch (err) {
        throw err;
      } finally {
        setLoader(false);
      }
    }

    loadPhones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (sort) {
      case 'age':
        setSelectOption('Newest');
        break;
      case 'price':
        setSelectOption('Cheapest');
        break;
      case 'title':
        setSelectOption('Alphabetically');
        break;
    }
  }, [sort]);

  function changePerPage(e: string) {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('page');

    if (e === 'All') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', e);
    }

    setSearchParams(newParams);
  }

  function selectPage(page: number) {
    const newParams = new URLSearchParams(searchParams);

    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', page.toString());
    }

    setSearchParams(newParams);
  }

  return (
    <>
      {!loader ? (
        <span className="container">
          <div className={styles.icons}>
            <Link to="/">
              <img
                className={styles.icon}
                src="public/img/icons/Home.svg"
                alt="Home Icon"
              />
            </Link>
            <img
              className={styles.icon}
              src="public/img/icons/Chevron (Arrow Right).svg"
              alt="arrow"
            />
            <p className="small--text" style={{ color: '#89939A' }}>
              Phones
            </p>
          </div>
          <h1 style={{ marginBottom: '8px' }}>Mobile Phones</h1>
          <p className={styles.modelsNumber}>{phones.length} models</p>
          {phones.length > 0 ? (
            <>
              <form className={styles.form}>
                <div className={styles.form__control}>
                  <CustomSelect
                    onSelect={changeSorting}
                    selected={selectOption || 'Newest'}
                    options={[
                      { label: 'Newest', value: 'age' },
                      { label: 'Alphabetically', value: 'title' },
                      { label: 'Cheapest', value: 'price' },
                    ]}
                  />
                </div>
                <div className={styles.form__control}>
                  <CustomSelect
                    onSelect={changePerPage}
                    selected={perPage || 'All'}
                    options={[
                      { label: '4', value: '4' },
                      { label: '8', value: '8' },
                      { label: '16', value: '16' },
                      { label: 'All', value: 'All' },
                    ]}
                  />
                </div>
              </form>
              <ProductsList type={'phones'} />
            </>
          ) : (
            <h2>There are no phones yet...</h2>
          )}
          {perPage !== 'All' && (
            <Pagination
              totalItems={phones.length}
              currentPage={+currentPage || 1}
              setPage={selectPage}
              perPage={+perPage}
            />
          )}
        </span>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PhonesPage;
