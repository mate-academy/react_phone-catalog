import React from 'react';
import { ProductCategories } from '../../components/ProductCategories';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Slider } from './../../components/Slider';
/*import { RouteContainer } from './../../components/Body/RouteContainer';
import { Catalog } from '../Catalog';*/

type HomePageProps={
  goods: Good[];
}

export const Home: React.FC<HomePageProps> = ({ goods }) => {
  const hotPriceModels = goods.sort((a, b) => b.discount - a.discount).slice(0, 4);
  const newestModels = goods.sort((a, b) => b.age - a.age).slice(0, 4);


 console.log(goods);
  return (
  <div className="homepage">

    <Slider />

    <h1 className="homepage__section-title">Hot prices</h1>
    <section className="homepage__view-products view-products">
      {hotPriceModels.map(model => (
        <ProductCard good={model} />
      ))}
    </section>

    <h1 className="homepage__section-title">Shop by category</h1>
      <ProductCategories />

    <h1 className="homepage__section-title">Brand new models</h1>
    <section className="homepage__view-products">
      {newestModels.map(model => (
        <ProductCard good={model} />
      ))}
    </section>
  </div>
  )
}

/*
<Switch>
  <RouteContainer
            exact
            path={`${match.path}`}
            component={Catalog}
    />
    <ShowByCategory />
  </Switch>
*/
