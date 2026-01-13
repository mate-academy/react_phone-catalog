

import './HomeBanner.css';
import headphonesImg from '../assets/visuals/neon-headphones.webp';

function Home() {
  return (
    <div className="home">

      <h1 className="home-title">
        TymoshchukMateStore
      </h1>


      <div className="home-visual">
        <img
          src={headphonesImg}
          alt="Neon headphones"
          className="home-visual-img"
        />
      </div>
    </div>
  );
}

export default Home;
