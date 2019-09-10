import React from 'react';
import SplittedText from './SplittedText';

const HomePage = () => (
  <section className="d-flex align-items-center
  justify-content-center section section_cover"
  >
    <div>
      <h1 className="title indent-mb-m">
        <SplittedText
          text="Homepage"
          addClassName="charm-wrapper_scale"
        />
      </h1>
    </div>
  </section>

);

export default HomePage;
