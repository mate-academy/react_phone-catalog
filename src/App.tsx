import React, { FC } from 'react';

import './styles/index.scss';
import { Footer } from './modules/Layout/Footer';
import { HashRouter as Router } from 'react-router-dom';
import { Text } from './modules/shared/ui/Text';

export const App: FC = () => {
  return (
    <Router>
      <div className="content">
        <Text variant="heading-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vero
          dolor illo minus in nam dignissimos eligendi, quia recusandae, dolores
          modi ducimus culpa ea voluptate cum saepe quod nisi a?
        </Text>
        <Text variant="heading-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vero
          dolor illo minus in nam dignissimos eligendi, quia recusandae, dolores
          modi ducimus culpa ea voluptate cum saepe quod nisi a?
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ad
          vitae omnis deserunt voluptatum dolorem repellat culpa. Explicabo,
          doloremque nam nulla tempora amet quis dolor fugit nihil labore
          placeat voluptatibus ex, odio accusantium, modi dignissimos sapiente!
          Debitis, harum magni pariatur quidem similique ipsum quaerat odit
          suscipit, commodi id dolores blanditiis! Asperiores officiis
          exercitationem perferendis eos ab error a, expedita, in soluta ea
          praesentium qui doloremque ipsum, at similique quisquam ut eaque
          cupiditate. Exercitationem doloribus atque suscipit commodi
          aspernatur, unde impedit quisquam illo ex! Eius alias aspernatur,
          corrupti quaerat repellendus, illum ex, eum quidem delectus doloremque
          ab consequuntur eveniet assumenda repudiandae.
        </Text>
      </div>
      <Footer />
    </Router>
  );
};
