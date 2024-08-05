import { memo } from 'react';
import { CustomizedCarousel } from '../CustomizedCarousel';
import './Welcome.scss';

// eslint-disable-next-line react/display-name
export const Welcome = memo(() => (
  <section className="welcome" id="welcome">
    <div className="welcome-wrapper">
      <h1 className="welcome__title">Welcome to Nice Gadgets store!</h1>
      <CustomizedCarousel />
    </div>
  </section>
));
