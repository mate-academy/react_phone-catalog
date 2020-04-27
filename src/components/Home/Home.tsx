import React, { FC } from 'react';
import './_Home.scss';
import { Slider } from '../Slider';

import { SmallCatalog } from '../SmallCatalog';
import { Categories } from '../Categories';

const Home: FC = () => (
  <section className="home">
    <div className="home__container wrapper">

      <Slider />
      <SmallCatalog titleName="Hot prices" />
      <Categories />
      <SmallCatalog titleName="Brand new models" />

    </div>
  </section>
);

export default Home;
