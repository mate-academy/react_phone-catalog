import { Link } from 'react-router-dom';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { client } from '../../client';
import { Loader } from '../../components/Loader';
import style from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [phones, setPhones] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Cool Catalog';

    client
      .getProducts('products')
      .then(data => setPhones(data))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const newModels = phones
    ? [...phones].sort((a, b) => b.year - a.year).slice(0, 9)
    : [];

  const getDiscount = (p: Product) => p.fullPrice - p.price;

  const hotPrice = phones
    ? [...phones].sort((a, b) => getDiscount(b) - getDiscount(a)).slice(0, 12)
    : [];

  const phonesCategory = phones
    ? phones.filter(product => product.category === 'phones')
    : [];

  const tabletsCategory = phones
    ? phones.filter(product => product.category === 'tablets')
    : [];

  const accessoriesCategory = phones
    ? phones.filter(product => product.category === 'accessories')
    : [];

  return (
    <>
      {/* <h1 hidden>Product Catalog</h1> */}

      <PicturesSlider />

      <section className={style.sect}>
        {loading ? (
          <Loader />
        ) : (
          <ProductsSlider
            title="Brand new models"
            products={newModels}
            priceMode="full"
          />
        )}
      </section>

      <section>
        <h3 className={style.title}>Shop by category</h3>
        <ul className={style.categories}>
          <li>
            <Link to="/phones" className={style.linkCategory}>
              <img
                src="/img/categories/categories_phones.svg"
                alt="category phones"
                className={style.partImg}
              />
              <p className={style.linkCategoryText}>Phones</p>
            </Link>
            <p className={style.paragraph}>{phonesCategory.length} models</p>
          </li>
          <li>
            <Link to="/tablets" className={style.linkCategory}>
              <img
                src="/img/categories/categories_tablet.svg"
                alt="category tablets"
                className={style.partImg}
              />
              <p className={style.linkCategoryText}>Tablets</p>
            </Link>
            <p className={style.paragraph}>{tabletsCategory.length} models</p>
          </li>
          <li>
            <Link to="/accessories" className={style.linkCategory}>
              <img
                src="/img/categories/categories_accessories.svg"
                alt="category accessories"
                className={style.partImg}
              />
              <p className={style.linkCategoryText}>Accessories</p>
            </Link>
            <p className={style.paragraph}>
              {accessoriesCategory.length} models
            </p>
          </li>
        </ul>
      </section>

      <section className={style.sectionFooter}>
        <ProductsSlider
          title="Hot price"
          products={hotPrice}
          priceMode="discount"
        />
      </section>
    </>
  );
};
