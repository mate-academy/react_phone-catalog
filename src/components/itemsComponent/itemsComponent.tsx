import { Accessories, Product, ProductChars } from '../../types';
import { CardComponent } from '../main/CardComponent/CardComponent';
import styles from '../PhonePage/phonePage.module.scss';

const itemsPerPageOptions = [4, 8, 16, 'all'];
const sortItemsOnPage = ['Newest', 'Alphabetically', 'Cheapest'];

type Props = {
  devices: (Product | ProductChars | Accessories)[];
};

export const ItemsComponent: React.FC<Props> = ({ devices }) => {
  return (
    <>
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
        {devices.map(phone => (
          <CardComponent key={phone.id} devices={phone} />
        ))}
      </div>
    </>
  );
};
