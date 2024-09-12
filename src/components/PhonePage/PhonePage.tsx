import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductsProvider';
import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/header';
import { CardComponent } from '../main/CardComponent/CardComponent';
import styles from './phonePage.module.scss';
import stylePage from '../HomePage/Welcome/homeface.module.scss';
import { PaginationPage } from './PaginationPage/PaginationPage';

const itemsPerPageOptions = [4, 8, 16, 'all'];
const sortItemsOnPage = ['Newest', 'Alphabetically', 'Cheapest'];

export const PhonePage = () => {
  const products = useProducts();

  const [SearchParams, setSearchParams] = useSearchParams();
  const [sortItems, setSortItems] = useState(products);
  const [filter] = useState('phones');

  const sortQuery = SearchParams.get('sort') || '';
  const pageQuery = +(SearchParams.get('page') || 0);

  const sort = (type: string) => {
    let sortedPhones;

    const phones = products.filter(a => a.category === filter);

    switch (type) {
      case 'Newest':
        sortedPhones = [...phones].sort((a, b) => {
          if (b.year >= a.year) {
            return b.price - a.price;
          }

          return b.year - a.year;
        });
        break;

      case 'Alphabetically':
        sortedPhones = [...phones].sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'Cheapest':
        sortedPhones = [...phones].sort((a, b) => a.price - b.price);
        break;

      default:
        sortedPhones = phones;
        break;
    }

    setSortItems(sortedPhones);

    const params = new URLSearchParams(SearchParams);

    params.set('sort', type);

    setSearchParams(params);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    sort(event.target.value);
  };

  const handlePerPageItems = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);

    const copy = [...sortItems];

    setSortItems(copy.slice(0, selectedValue));

    const params = new URLSearchParams(SearchParams);

    params.set('perPage', event.target.value);
    setSearchParams(params);
  };

  useEffect(() => {
    const filteredPhones = products.filter(a => a.category === filter);

    setSortItems(filteredPhones);

    if (sortQuery === '') {
      return;
    } else {
      sort(sortQuery);
    }
  }, [products, sortQuery, setSearchParams, pageQuery]);

  return (
    <div>
      <Header />
      <div className={stylePage.home_page}>
        <div className={styles.phone}>
          <span></span>
          <span></span>
          <div className={styles.phone_head}></div>
        </div>

        <div className={styles.phone_head}>
          <h1 className={styles.phone_h1}>Mobile Phones</h1>
          <span>92 models</span>

          <div className={styles.phone_select}>
            <form action="select">
              <label htmlFor="Sort by">Sort by</label>

              <div>
                <select name="char" id="0" onChange={handleSortChange}>
                  {sortItemsOnPage.map(option => (
                    <option key={option} value={option}>
                      <a href={`?sort=${option}`}></a>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <form action="select">
              <label htmlFor="Items of page">Items of page</label>

              <div>
                <select name="char" id="0" onChange={handlePerPageItems}>
                  {itemsPerPageOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.phone_row_container}>
          <div className={styles.phone_row}>
            {sortItems.map(phone => (
              <CardComponent key={phone.id} devices={phone} />
            ))}
          </div>

          <div>
            <PaginationPage />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
