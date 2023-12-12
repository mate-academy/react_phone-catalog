import { useAppSelector } from '../../app/hooks';
import { Box } from '../../UI/Box';
import {
  selectFavourites,
} from '../../features/favouritesSlices/favouritesSlice';
import { PhoneItem } from '../Phones/PhoneItem';
import styles from '../Phones/Phones.module.scss';

export const Favourites = () => {
  const favouritesPhones = useAppSelector(selectFavourites);
  console.log(favouritesPhones);

  return (
    <Box>
      <h1>Favourites</h1>
      <ul className={styles.grid}>
        {favouritesPhones.map((phone) => (
          <li className={styles.children} key={phone.itemId}>
            <PhoneItem phone={phone} />
          </li>
        ))}
      </ul>
    </Box>
  );
};
