// import { Slider } from '../../components/Slider';
import { Slider } from '../../components/Slider';
import '../../styles/utils/typography.scss';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="container">
      <div className="home-page__top">
        <h1 className="title">Welcome to Nice Gadgets store!</h1>
        <Slider />
      </div>
    </div>
  );
};
