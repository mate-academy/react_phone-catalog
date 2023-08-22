import React from 'react';

import { Player } from '../../components/player/Player';

import './HomePage.scss';

export const HomePage: React.FC = React.memo(() => (
  <section
    className="homePage page__section"
  >
    <div className="container">
      <div className="grid">
        <div className="homePage__player">
          <Player />
        </div>
      </div>
    </div>
  </section>
));
