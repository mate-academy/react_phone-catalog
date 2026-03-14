import { useEffect, useMemo, useState } from 'react';
import { MainSlider } from '../../shared/components/MainSlider/MainSlider';
import s from './HomePage.module.scss';
import { Products } from '../../types/Product';
import { getHotPrices, getNewProducts, getProducts } from '../../services/dataService';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Link } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader/Loader';

const categories = [
  {
    id: 1,
    title: 'Mobile phones',
    imgUrl: './img/category-phones.png',
    categoryName: 'phones',
    link: '/phones',
    backgroundColor: 'rgba(109, 100, 116, 1)',
  },
  {
    id: 2,
    title: 'Tablets',
    imgUrl: './img/category-tablets.png',
    categoryName: 'tablets',
    link: '/tablets',
    backgroundColor: '#F1F2F3',
  },
  {
    id: 3,
    title: 'Accessories',
    imgUrl: './img/category-accessories.png',
    categoryName: 'accessories',
    link: '/accessories',
    backgroundColor: 'rgba(213, 60, 81, 1)',
  },
];

export const HomePage = () => {
  const [newProducts, setNewProducts] = useState<Products[]>([]);
  const [hotPrices, setHotPrices] = useState<Products[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [newProds, hotProds, allProducts] = await Promise.all([
          getNewProducts(),
          getHotPrices(),
          getProducts(),
        ]);

        setNewProducts(newProds);
        setHotPrices(hotProds);
        setProducts(allProducts);
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const categoryCounts = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>, // вказуємо, що ключ рядок, а значення число
    );
  }, [products]);

  return (
    <div className={s.content}>
      {loading && <Loader />}

      {error && !loading && <div className={s.errorMessage}>{error}</div>}

      {!error && !loading && (
        <>
          <h1 className={s.visuallyHidden}>Product Catalog</h1>
          <h2 className={s.headerTitle}>Welcome to Nice Gadgets store!</h2>

          <div className={s.sliderGallery}>
            <MainSlider />
          </div>

          <div className={s.contentBlocks}>
            {newProducts.length > 0 && (
              <div className={s.newModels}>
                <ProductSlider title="Brand new models" products={newProducts} />
              </div>
            )}
            <div className={s.byCategory}>
              <h2 className={s.contentTitle}>Shop by category</h2>
              <div className={s.categoryList}>
                {categories.map((cat) => (
                  <Link to={cat.link} className={s.categorySection} key={cat.id}>
                    <div
                      className={s.imageWrapper}
                      style={{ backgroundColor: cat.backgroundColor }}
                    >
                      <img src={cat.imgUrl} alt={cat.title} className={s.categoryImg} />
                    </div>
                    <h4 className={s.categoryTitle}>{cat.title}</h4>
                    <span className={s.categoryCount}>
                      {categoryCounts[cat.categoryName] || 0} models
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {hotPrices.length > 0 && (
              <div className={s.hotPrices}>
                <ProductSlider title="Hot prices" products={hotPrices} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
