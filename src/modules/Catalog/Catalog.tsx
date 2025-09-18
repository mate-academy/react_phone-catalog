// import Slider from './components/Slider';
import styles from './Catalog.module.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { CatalogInterface } from './interfaces/CatalogInterface';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

interface Item {
  id: string | number;
  name: string;
}

export const Catalog: React.FC<CatalogInterface> = ({ type }) => {
  const [data, setData] = useState<Item[]>([]);

  const titles: Record<CatalogInterface['type'], string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  useEffect(() => {
    fetch(`api/${type}`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [type]);

  return (
    <>
      <Helmet>
        <title>{titles[type]}</title>
      </Helmet>

      <div className={styles.catalogPage}>
        <BreadCrumbs />
        <h1 className={styles.catalogTitle}>{titles[type]}</h1>

        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
