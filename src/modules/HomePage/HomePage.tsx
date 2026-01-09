import { Commertials } from '../../components/Commertials';
import home from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={home.home}>
      <div className="container">
        <h1 className={home.home__title}>Welcome to Nice Gadgets store!</h1>
      </div>
      <Commertials />
    </div>
  );
};
