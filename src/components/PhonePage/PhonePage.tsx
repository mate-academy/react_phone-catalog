import { useState } from 'react';
import { usePhones } from '../../context/PhonesProvider';
import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/header';
import { CardComponent } from '../main/CardComponent/CardComponent';
import styles from './phonePage.module.scss';

const itemsPerPageOptions = [4, 8, 16, 'all'];
const sortItemsOnPage = ['Newest', 'Alphabetically', 'Cheapest'];

export const PhonePage = () => {
  const phones = usePhones();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('all');

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));

    setCurrentPage(1);
  };

  return (
    <div>
      <Header />
      <div>
        <div className={styles.phone}>
          <span></span>
          <span></span>
          <div className={styles.phone_head}>
            <h1 className={styles.phone_h1}>Mobile Phones</h1>
            <span>92 models</span>

            <div className={styles.phone_select}>
              <form action="select">
                <label htmlFor="Sort by">Sort by</label>

                <div>
                  <select name="char" id="0">
                    {sortItemsOnPage.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </form>

              <form action="select">
                <label htmlFor="Items of page">Items of page</label>

                <div>
                  <select name="char" id="0">
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

          <div className={styles.phone_row}>
            {phones.map(phone => (
              <CardComponent key={phone.id} devices={phone} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
