import './Home.scss';

export const Home = () => {
  return (
    <div className="home">
      <div className="home__welcome">
        Welcome to Nice
        <br className="home__welcome--break" />
        Gadgets store!
      </div>
      <div className="home__slider">
        <div className="home__slider--arrow">
          <img src="../../img/arrow-left.png" alt="left" />
        </div>
        <div className="home__slider--screen"></div>
        <div className="home__slider--arrow">
          <img src="../../img/arrow-right.png" alt="right" />
        </div>
      </div>
      <div className="home__markers">
        <div className="home__markers--marker marker-active"></div>
        <div className="home__markers--marker"></div>
        <div className="home__markers--marker"></div>
      </div>
    </div>
  );
};
