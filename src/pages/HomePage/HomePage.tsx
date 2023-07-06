import { FC } from 'react';
import { Product } from '../../types/Product';
import { BannerSlider } from '../../components/BannerSlider';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';
import { BrandNew } from '../../components/BrandNew';

type Props = {
  products: Product[],
};

export const HomePage: FC<Props> = ({ products }) => {
  return (
    <>
      <BannerSlider />
      <HotPrices products={products} />
      <ShopByCategory products={products} />
      <BrandNew products={products} />
    </>
  );
};

// Create ProductsSlider component and use it in Hot prices block
// Create getHotPriceProducts method fetching products with discount from API sorted by
// absolute discount value (not percentage given in API)
// For now do all the filtering and sorting on client side
// Create ProductCard component to use it everywhere and add data-cy="cardsContainer" attribute to the container of these elements
// Add ability to use < and > buttons to scroll products.

// {/* <div className="home-page__hot-price">
//   <ProductsSlider title="Hot prices" products={sortedByMaxDiscount} />
// </div> */}

// {/* <section className="hot-prices page__section">
//   <h2 className="hot-prices__title page__section-title">
//     Hot prices
//   </h2>

//   <ProductsSlider products={products} />
// </section> */}
