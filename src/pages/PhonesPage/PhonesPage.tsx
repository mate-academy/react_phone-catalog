/* eslint-disable @typescript-eslint/no-explicit-any */

//#region import
import styles from './PhonesPage.module.scss';
import 'swiper/swiper-bundle.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { useState } from 'react';
import Home from '../../icons/Home.svg';
import Right from '../../icons/Right.svg';
import Left from '../../icons/Left.svg';
import { Link } from 'react-router-dom';
import { BrandCard } from '../../components/BrandCard';
//#endregion

const items = [{ count: 16 }, { count: 24 }, { count: 48 }, { count: 96 }];
const sorts = [{ sort: 'new' }, { sort: 'popular' }, { sort: 'old' }];

export function PhonesPage() {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [selectedSort, setSelectedSort] = useState(sorts[0]);

  return (
    <div className={styles.phonesPage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.BreadCrumbs}>
          <Link to={'/'} className={styles.BreadCrumbs__link}>
            <img src={Home} alt="" className={styles.BreadCrumbs__img} />
          </Link>
          <img src={Right} alt="" />
          <Link to={'/Phones'} className={styles.BreadCrumbs__link}>
            Phones
          </Link>
        </div>
        <div className={styles.controls}>
          <h1 className={styles.controls__title}>Mobile phones</h1>
          <p className={styles.controls__models}>95 models</p>
        </div>

        <div className={styles.menu}>
          <div className={styles.menu__block}>
            <h2 className={styles.menu__block__title}>Sort by</h2>
            <div className={styles.listbox}>
              <Listbox value={selectedSort} onChange={setSelectedSort}>
                <ListboxButton className={styles.listbox__button}>
                  {' '}
                  {selectedSort.sort}
                </ListboxButton>
                <ListboxOptions className={styles.listbox__options}>
                  {sorts.map(sort => (
                    <ListboxOption
                      key={sort.sort}
                      value={sort}
                      className={styles.listbox__option}
                    >
                      {sort.sort}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
          <div className={styles.menu__block}>
            <h2 className={styles.menu__block__title}>Items on page</h2>
            <div className={styles.listbox}>
              <Listbox value={selectedItem} onChange={setSelectedItem}>
                <ListboxButton className={styles.listbox__button}>
                  {selectedItem.count}
                </ListboxButton>
                <ListboxOptions className={styles.listbox__options}>
                  {items.map(item => (
                    <ListboxOption
                      key={item.count}
                      value={item}
                      className={styles.listbox__option}
                    >
                      {item.count}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          <BrandCard />
          <BrandCard />
          <BrandCard />
          <BrandCard />
        </div>

        <div className={styles.pagination}>
          <button className={styles.pagination__button}>
            <img src={Left} alt="" className={styles.pagination__img} />
          </button>
          <div className={styles.agination}>
            <Link to={'page-1'} className={styles.agination__link}>
              1
            </Link>
            <Link to={'page-2'} className={styles.agination__link}>
              2
            </Link>
            <Link to={'page-3'} className={styles.agination__link}>
              3
            </Link>
            <Link to={'page-4'} className={styles.agination__link}>
              4
            </Link>
          </div>
          <button className={styles.pagination__button}>
            <img src={Right} alt="" className={styles.pagination__img} />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
