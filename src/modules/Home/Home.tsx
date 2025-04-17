import { Slider } from './components/Slider';
import s from './Home.module.scss';

export const Home = () => {
  return (
    <section className={`${s.home} ${s.container}`}>
      <p className={s.home__title}>Welcome to Nice Gadgets store!</p>
      <Slider />
    </section>
  );
};
