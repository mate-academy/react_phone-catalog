import React, { FC } from 'react';
import './_HomePageMain.scss';
import { Slider } from '../Slider';

import { SmallCatalog } from '../SmallCatalog';
import { Categories } from '../Categories';

export const HomePageMain: FC = () => (

  <section className="homePage">
    <div className="homePage__container wrapper">

      <Slider />
      <SmallCatalog titleName="Hot prices" />
      <Categories />
      <SmallCatalog titleName="Brand new models" />

    </div>
  </section>

);
