import { FC, useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { PicturesSlider } from './components/PicturesSlider';
import { CategoryCard } from './components/CategoryCard';
import { ProductsSlider } from './components/ProductsSlider';
import {
  getHomePageData,
  HomePageData,
  Banner,
  ProductCard,
} from '../../services/api';
import styles from './HomePage.module.scss';

interface Category {
  id: number;
  name: string;
  image: string;
  link: string;
  count: number;
  categoryId: 'phones' | 'tablets' | 'accessories';
}

interface HomePageState {
  banners: Banner[];
  newProducts: ProductCard[];
  categories: Category[];
  hotPrices: ProductCard[];
  loading: boolean;
  error: string | null;
}

export const HomePage: FC = () => {
  const [state, setState] = useState<HomePageState>({
    banners: [],
    newProducts: [],
    categories: [],
    hotPrices: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: HomePageData = await getHomePageData();

        const phonesResponse = await fetch('api/phones.json').then(res =>
          res.json(),
        );
        const tabletsResponse = await fetch('api/tablets.json').then(res =>
          res.json(),
        );
        const accessoriesResponse = await fetch('api/accessories.json').then(
          res => res.json(),
        );

        const allProducts: ProductCard[] = [
          ...phonesResponse,
          ...tabletsResponse,
          ...accessoriesResponse,
        ];

        const phonesCount = allProducts.filter(
          (p: ProductCard) => p.category === 'phones',
        ).length;
        const tabletsCount = allProducts.filter(
          (p: ProductCard) => p.category === 'tablets',
        ).length;
        const accessoriesCount = allProducts.filter(
          (p: ProductCard) => p.category === 'accessories',
        ).length;

        const categories: Category[] = [
          {
            id: 1,
            name: 'Mobile phones',
            image: 'img/ShopByCategoryPhone.png',
            link: '/phones',
            count: phonesCount,
            categoryId: 'phones',
          },
          {
            id: 2,
            name: 'Tablets',
            image: 'img/ShopByCategoryTablets.png',
            link: '/tablets',
            count: tabletsCount,
            categoryId: 'tablets',
          },
          {
            id: 3,
            name: 'Accessories',
            image: 'img/ShopByCategoryAccessories.png',
            link: '/accessories',
            count: accessoriesCount,
            categoryId: 'accessories',
          },
        ];

        setState({
          banners: data.banners,
          newProducts: data.newProducts,
          categories: categories,
          hotPrices: data.hotPrices,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: null,
        }));
      }
    };

    fetchData();
  }, []);

  if (state.error) {
    return (
      <main className={styles.homePage}>
        <Container>
          <div className={styles.error}>{state.error}</div>
        </Container>
      </main>
    );
  }

  return (
    <main className={styles.homePage}>
      <PicturesSlider banners={state.banners} />

      <Container>
        <ProductsSlider
          title="Brand new models"
          products={state.newProducts}
          showDiscount={false}
        />
        {state.categories?.length > 0 && (
          <section className={styles.categoriesSection}>
            <h2 className={styles.categoriesTitle}>Shop by category</h2>
            <div className={styles.categoriesGrid}>
              {state.categories.map(category => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  link={category.link}
                  count={category.count}
                  image={category.image}
                  categoryId={category.categoryId}
                />
              ))}
            </div>
          </section>
        )}
        {/* Hot prices */}
        <ProductsSlider
          title="Hot prices"
          products={state.hotPrices}
          showDiscount={true}
          classNameSection={styles.hotPricesSlider}
        />
      </Container>
    </main>
  );
};
