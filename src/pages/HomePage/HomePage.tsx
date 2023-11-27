import {
  FC,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { ShopByCategories } from '../../components/ShopByCategories';
import { ProductsSlider } from '../../components/ProductSlider/ProductSlider';
import { InfiniteSlider } from '../../components/InfiniteSlider/InfiniteSlider';
import { CatalogProduct } from '../../types/CatalogProduct';
import { getProducts } from '../../utils/fetchData';

import './HomePage.scss';
import { MobileSwiper } from '../../components/MobileSwiper/MobileSwiper';

const carouselImagesUrl = [
  './_new/img/banner-phones.png',
  './_new/img/banner-tablets.png',
  './_new/img/banner-accessories.png',
];

export const HomePage: FC = () => {
  const [products, setProducts] = useState<CatalogProduct[]>([]);

  const navigate = useNavigate();

  const getHotPricesProducts = () => {
    const hotPriceProducts = products
      .filter(product => product.price > 0)
      .sort((productOne, productTwo) => {
        const productOnePrice = productOne.fullPrice - productOne.price;
        const productTwoPrice = productTwo.fullPrice - productTwo.price;

        return productOnePrice - productTwoPrice;
      });

    return hotPriceProducts;
  };

  const getBrandNewModels = () => {
    const brandNewModels = products
      .filter(product => product.price > 0)
      .sort((productOne, productTwo) => {
        return productTwo.year - productOne.year;
      });

    return brandNewModels;
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
      const productsFromServer = await getProducts();

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
      <InfiniteSlider carouselImagesUrl={carouselImagesUrl} />

      <ProductsSlider title="Hot prices" products={getHotPricesProducts()} />

      <MobileSwiper
        title="Hot prices"
        products={getHotPricesProducts()}
      />

      <ShopByCategories
        phonesAmount={phonesAmount}
        tabletsAmount={tabletsAmount}
        accessoriesAmount={accessoriesAmount}
      />

      <ProductsSlider title="Brand new models" products={getBrandNewModels()} />
    </div>
  );
};
