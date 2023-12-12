import { useEffect, useState } from 'react';
import { Box } from '../../UI/Box';
import { PhoneItem } from './PhoneItem';
import styles from './Phones.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchPhones,
  restorePhones,
  selectPhones,
  selectStatus,
} from '../../features/favouritesSlices/favouritesSlice';

export const Phones = () => {
  console.log('render Phones');
  const [itemsPerPage, setItemsPerPage] = useState('');
  const phones = useAppSelector(selectPhones) || [];
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restorePhones(phones));
    if (status === 'idle') {
      dispatch(fetchPhones());
    }
  }, [selectStatus, dispatch]);

  console.log(phones);

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
          {phones.map((phone) => (
            <li className={styles.children} key={phone.phoneId}>
              <PhoneItem phone={phone} />
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};
