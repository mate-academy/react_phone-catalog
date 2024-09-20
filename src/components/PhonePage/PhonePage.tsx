import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/Header';
import { CardComponent } from '../main/CardComponent/CardComponent';
import styles from './phonePage.module.scss';
import stylePage from '../HomePage/Welcome/homeface.module.scss';
import { TransitionComponent } from '../main/Transition/TransitionComponent';
import { Loader } from '../loader/Loader';
import { useDevices } from '../../context/DeviceProvider';

interface Props {
  filter: string;
}

const itemsPerPageOptions = ['all', 4, 8, 16];
const sortItemsOnPage = ['Newest', 'Alphabetically', 'Cheapest'];

export const PhonePage: React.FC<Props> = ({ filter }) => {
  const { products } = useDevices();

  const [SearchParams, setSearchParams] = useSearchParams();
  const [sortItems, setSortItems] = useState(products);
  const [loaded, setLoaded] = useState(true);

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

    if (products.length > 0) {
      const timer = setTimeout(() => {
        setLoaded(false);
      }, 1000);

      return () => clearTimeout(timer);
    }

    setLoaded(false);
    window.scrollTo(0, 0);

    return;
  }, [products, filter, pageQuery, perPageQuery]);

  useEffect(() => {
    sort(sortQuery);
    window.scrollTo(0, 0);
  }, [sortQuery, filter]);

  return (
    <div>
      <Header />
      <div className={stylePage.home_page}>
        <TransitionComponent filter={filter} />

        <div className={styles.phone_head}>
          <div className={styles.phone_head_contain}>
            <h1 className={styles.phone_h1}>{`${filter} page`}</h1>
            <span
              className={styles.phone_head_span}
            >{`${filteredPhones.length} models`}</span>
          </div>

          <div className={styles.phone_select}>
            <form action="select">
              <label htmlFor="Sort by" className={styles.phone_label}>
                Sort by
              </label>

              <div className={styles.phone_sections_container}>
                <select
                  name="char"
                  onChange={handleSortChange}
                  className={styles.phone_sections}
                >
                  {sortItemsOnPage.map(option => (
                    <option
                      key={option}
                      value={option}
                      className={styles.phone_options}
                    >
                      <a href={`?sort=${option}`}></a>
                      {option}
                    </option>
                  ))}

                  <img src="img/vector_up.png" alt="icon" />
                </select>
              </div>
            </form>

            <form action="select">
              <label htmlFor="Items of page" className={styles.phone_label}>
                Items of page
              </label>

              <div>
                <select
                  name="char"
                  id="0"
                  onChange={handlePerPageItems}
                  className={styles.phone_sections}
                >
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

        {loaded && <Loader />}

        <div className={styles.phone_row_container}>
          <div className={styles.phone_row}>
            {sortItems.map(phone => (
              <CardComponent key={phone.id} devices={phone} />
            ))}
          </div>

          {totalPages > 1 && (
            <div>
              <ul className={styles.ul_containter}>
                <li>
                  <button
                    onClick={() => handlePageClick(pageQuery - 1)}
                    className={styles.li}
                  >
                    <img src="img/Vector_left.svg" alt="" />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} onClick={() => handlePageClick(i + 1)}>
                    <button className={styles.li}>{i + 1}</button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageClick(pageQuery + 1)}
                    className={styles.li}
                  >
                    <img src="img/Vector_right.svg" alt="" />
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
