import { usePhones } from '../../context/PhonesProvider';
import { Footer } from '../Footer/Footer';
import { Header } from '../HomePage/Header/header';
import { CardComponent } from '../main/CardComponent/CardComponent';
import styles from './phonePage.module.scss';

export const PhonePage = () => {
  const phones = usePhones();

  return (
    <div>
      <Header />
      <div>
        <div>
          <div className={styles.phone_head}>
            <h1>Mobile Phones</h1>
            <span>92 models</span>

            <form action="select">
              <label htmlFor="Sort by">Sort by</label>

              <select name="char" id="0">
                <option value="newest">Newest</option>
              </select>
            </form>
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
