import Carousel from "./Carousel";
import styles from './HomePage.module.scss';
const HomePage = () => {
  return (<>
    <h1 className={styles.PageTitle}>Welcome to Nice Gadgets store!</h1>
    <Carousel />
  </>);
};

export default HomePage;
