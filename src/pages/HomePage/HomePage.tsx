import React from 'react';
import { ProductCategories } from '../../components/ProductCategories';
import { Slider } from './../../components/Slider';
import { CardSlider } from '../../components/CardSlider/CardSlider';
/*import { RouteContainer } from './../../components/Body/RouteContainer';
import { Catalog } from '../Catalog';*/

type HomePageProps={
  goods: Good[];
}

export const Home: React.FC<HomePageProps> = ({ goods }) => {
  const hotPriceModels = goods.sort((a, b) => b.discount - a.discount);
  const newestModels = goods.sort((a, b) => b.age - a.age);

  return (
  <div className="homepage">

    <Slider />

    <CardSlider goods={hotPriceModels}/>

    <ProductCategories />

    <CardSlider goods={newestModels}/>
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
