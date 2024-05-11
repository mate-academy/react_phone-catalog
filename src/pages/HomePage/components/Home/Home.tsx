import './Home.scss';
import { PicturesSlider } from '../PicturesSlider';

export const Home: React.FC = () => {
  return (
    <main className="main">
      <section>
        <h1>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
        {/* <img src="./img/new-phone.png" /> */}
      </section>
    </main>
  );
};
