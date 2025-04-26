import './homePage.scss';
import { PicturesSlider } from '../../components/picturesSlider';
import { Category } from '../../components/category';
import { ProductsSlider } from '../../components/productsSlider';
import { ProductListItem } from '../../types/product';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { mapToProductListItem } from '../../function/mapToProductListItem';

export const HomePage = () => {
  const newModels = 'Brand new models';
  const hotPrices = 'Hot prices';

  const allProducts: ProductListItem[] = [
    ...phones.map((p, i) =>
      mapToProductListItem({ ...p, category: 'phones' }, i),
    ),
    ...tablets.map((p, i) =>
      mapToProductListItem({ ...p, category: 'tablets' }, i + phones.length),
    ),
    ...accessories.map((p, i) =>
      mapToProductListItem(
        { ...p, category: 'accessories' },
        i + phones.length + tablets.length,
      ),
    ),
  ];

  const newModelsProducts = allProducts
    .filter(product =>
      ['phones', 'tablets', 'accessories'].includes(product.category),
    )
    .sort((a, b) => b.year - a.year) as ProductListItem[];

  const hotPricesProducts = allProducts
    .filter(product =>
      ['phones', 'tablets', 'accessories'].includes(product.category),
    )
    .sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    ) as ProductListItem[];

  return (
    <div className="homePage container">
      <p className=" h1 homePage__title">Welcome to Nice Gadgets store!</p>
      <PicturesSlider />
      <ProductsSlider products={newModelsProducts} title={newModels} />
      <h2 className="h2 category__title">Shop by category</h2>
      <Category />
      <ProductsSlider products={hotPricesProducts} title={hotPrices} />
      <div className="container__end"></div>
    </div>
  );
};
