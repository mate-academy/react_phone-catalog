import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductsProvider';
import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/header';
import { CardComponent } from '../main/CardComponent/CardComponent';
import styles from './phonePage.module.scss';
import stylePage from '../HomePage/Welcome/homeface.module.scss';

interface Props {
  filter: string;
}

const itemsPerPageOptions = ['all', 4, 8, 16];
const sortItemsOnPage = ['Newest', 'Alphabetically', 'Cheapest'];

export const PhonePage: React.FC<Props> = ({ filter }) => {
  const products = useProducts();

  const [SearchParams, setSearchParams] = useSearchParams();
  const [sortItems, setSortItems] = useState(products);

  const sortQuery = SearchParams.get('sort') || 'Newest';
  const perPageQuery = +(SearchParams.get('perPage') || 'all');
  const pageQuery = +(SearchParams.get('Page') || 1);
  const filteredPhones = products.filter(a => a.category === filter);

  const totalPages = Math.ceil(filteredPhones.length / perPageQuery);

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

    const filterItems = sortItems.filter(gadget => gadget.id <= selectedValue);

    setSortItems(filterItems);

    const params = new URLSearchParams(SearchParams);

    params.set('perPage', event.target.value);
    setSearchParams(params);
  };

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || isNaN(page)) {
      setSortItems(filteredPhones);

      return;
    }

    const params = new URLSearchParams(SearchParams);

    params.set('Page', page.toString());
    setSearchParams(params);
  };

  useEffect(() => {
    const filteredProducts = products.filter(a => a.category === filter);

    const startIndex = (pageQuery - 1) * perPageQuery;
    const endIndex = startIndex + perPageQuery;

    setSortItems(filteredProducts.slice(startIndex, endIndex));
  }, [products, filter, pageQuery, perPageQuery]);

  useEffect(() => {
    sort(sortQuery);
  }, [sortQuery, filter]);

  return (
    <div>
      <Header />
      <div className={stylePage.home_page}>
        <div className={styles.phone}>
          <span>123</span>
          <span>{' > '}</span>
          <div className={styles.phone_head}>{filter}</div>
        </div>

        <div className={styles.phone_head}>
          <h1 className={styles.phone_h1}>{`${filter} page`}</h1>
          <span>{`${filteredPhones.length} models`}</span>

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

          {totalPages > 1 && (
            <div>
              <ul className={styles.ul_containter}>
                <li className={styles.li}>
                  <button onClick={() => handlePageClick(pageQuery - 1)}>
                    «
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={styles.li}
                    onClick={() => handlePageClick(i + 1)}
                  >
                    <button>{i + 1}</button>
                  </li>
                ))}
                <li className={styles.li}>
                  <button onClick={() => handlePageClick(pageQuery + 1)}>
                    »
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
