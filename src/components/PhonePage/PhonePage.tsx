import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/HeaderComponent';
import { CardComponent } from '../main/CardComponent/CardComponent';
import styles from './phonePage.module.scss';
import stylePage from '../HomePage/Welcome/homeface.module.scss';
import { TransitionComponent } from '../main/Transition/TransitionComponent';
import { Loader } from '../loader/Loader';
import { useDevices } from '../../context/DeviceProvider';
import { Product } from '../../types';
import { Pagination } from './PaginationComponent';

interface Props {
  filter: string;
}

const itemsPerPageOptions = ['All', '4', '8', '16'];
const sortItemsOnPage = ['Newest', 'Alphabetically', 'Cheapest'];

export const PhonePage: React.FC<Props> = ({ filter }) => {
  const { products } = useDevices();

  const [SearchParams, setSearchParams] = useSearchParams();
  const [loaded, setLoaded] = useState(true);
  const [sortItems, setSortItems] = useState<Product[]>([]);
  const filteredPhones = products.filter(a => a.category === filter);

  const sortQuery = SearchParams.get('sort') || 'Newest';
  const perPageQuery = SearchParams.get('perPage') || filteredPhones.length;
  const pageQuery = +(SearchParams.get('page') || 1);

  const totalPages = Math.ceil(filteredPhones.length / Number(perPageQuery));

  const sort = (type: string, phones: Product[]) => {
    switch (type) {
      case 'Newest':
        phones.sort((a, b) => {
          if (b.year === a.year) {
            return b.price - a.price;
          }

          return b.year - a.year;
        });
        break;

      case 'Alphabetically':
        phones.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'Cheapest':
        phones.sort((a, b) => a.price - b.price);
        break;

      default:
        break;
    }

    return phones;
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;

    const params = new URLSearchParams(SearchParams);

    params.set('sort', sortValue);
    setSearchParams(params);
  };

  const handlePerPageItems = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    const params = new URLSearchParams(SearchParams);

    if (selectedValue === 'All') {
      params.set('perPage', 'All');
    } else {
      params.set('perPage', selectedValue);
    }

    setSearchParams(params);
  };

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    const params = new URLSearchParams(SearchParams);

    params.set('page', page.toString());
    setSearchParams(params);
  };

  useEffect(() => {
    const filteredProducts = products.filter(
      product => product.category === filter,
    );
    const sortedProducts = sort(sortQuery, filteredProducts);

    const startIndex = (pageQuery - 1) * Number(perPageQuery);
    const endIndex =
      perPageQuery === 'All'
        ? sortedProducts.length
        : startIndex + Number(perPageQuery);

    window.scrollTo(0, 0);
    setSortItems(sortedProducts.slice(startIndex, endIndex));

    const timer = setTimeout(() => {
      setLoaded(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [products, filter, pageQuery, perPageQuery, sortQuery]);

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
                <Pagination
                  totalPages={totalPages}
                  currentPage={pageQuery}
                  handlePageClick={handlePageClick}
                />
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
