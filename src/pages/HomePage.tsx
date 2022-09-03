import { SliderCarousel } from '../components/SliderCarousel/SliderCarousel';

export const HomePage = () => {
  return (
    <section
      className="banner page__section"
      id="banner"
    >
      <div className="container">
        <SliderCarousel />
      </div>
    </section>
  );
};
