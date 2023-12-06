import { useState } from 'react';
import { Box } from '../../UI/Box';
import { useGetPhonesQuery } from '../../features/phonesApi/api';
import { PhoneItem } from './PhoneItem';
import styles from './Phones.module.scss';

export const Phones = () => {
  const [itemsPerPage, setItemsPerPage] = useState('');
  const { data = [] } = useGetPhonesQuery(itemsPerPage);

  return (
    <>
      <Box>
        <p>BreadCrams</p>
        <h1>Modile Phones</h1>
        <p>Modile length</p>
        <div>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value="all">all</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
        <ul className={styles.grid}>
          {data.map((phone) => (
            <li className={styles.children} key={phone.itemId}>
              <PhoneItem phone={phone} />
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};
