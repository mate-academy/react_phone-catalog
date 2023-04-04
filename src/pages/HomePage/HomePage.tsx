import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsSlider } from '../../components/ProductsSlider';
import {
  ProductsByCategories,
} from '../../components/ProductsByCategories';
import { CatalogProduct } from '../../types/CatalogProduct';
import './HomePage.scss';
import { getProductsList } from '../../helpers/fetchData';
import { InfiniteSlider } from '../../components/InfiniteSlider';
import { MobileSwiper } from '../../components/MobileSwiper';

const carouselImages = [
  { path: '/phones', imageUrl: './img/img/banner-phones.png' },
  { path: '/tablets', imageUrl: './img/img/banner-tablets.png' },
  { path: '/accessories', imageUrl: './img/img/banner-accessories.png' },
];

export const HomePage: FC = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const getHotPriceProducts = () => {
    const hotPriceProducts = products
      .filter((
        product: CatalogProduct,
      ) => product.fullPrice - product.price > 80)
      .sort((
        productA: CatalogProduct,
        productB: CatalogProduct,
      ) => {
        const absoluteDiscountA = productA.fullPrice - productA.price;
        const absoluteDiscountB = productB.fullPrice - productB.price;

        return absoluteDiscountB - absoluteDiscountA;
      });

    return hotPriceProducts;
  };

  const getBrandNewProducts = () => {
    const brandNewProducts = products
      .filter((
        product: CatalogProduct,
      ) => product.year > 2018 && product.price > 1500)
      .sort((
        productA: CatalogProduct,
        productB: CatalogProduct,
      ) => {
        return productB.price - productA.price;
      });

    return brandNewProducts;
  };

  const phonesAmount = products.filter(
    (product: CatalogProduct) => product.category === 'phones',
  ).length;

  const tabletsAmount = products.filter(
    (product: CatalogProduct) => product.category === 'tablet',
  ).length;

  const accessoriesAmount = products.filter(
    (product: CatalogProduct) => product.category === 'accessory',
  ).length;

  const handleLoading = async () => {
    try {
      const productsFromServer = await getProductsList();

      setProducts(productsFromServer);
    } catch (error) {
      navigate('/notfound', { replace: true });
    }
  };

  useEffect(() => {
    handleLoading();
  }, []);

  return (
    <div className="home-page main__page">
      <InfiniteSlider carouselImages={carouselImages} />

      <ProductsSlider
        title="Hot prices"
        products={getHotPriceProducts()}
      />

      <MobileSwiper
        title="Hot prices"
        products={getHotPriceProducts()}
      />

      <ProductsByCategories
        phonesAmount={phonesAmount}
        tabletsAmount={tabletsAmount}
        accessoriesAmount={accessoriesAmount}
      />

      <ProductsSlider
        title="Brand new models"
        products={getBrandNewProducts()}
      />

      <MobileSwiper
        title="Brand new models"
        products={getBrandNewProducts()}
      />
    </div>
  );
};
