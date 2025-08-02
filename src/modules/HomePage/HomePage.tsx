import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { ProductsSlider } from "../../components/ProductsSlider";
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header />
      <ProductsSlider title={'Brand new models'} filter={item => item.name.includes('14')}/>
      <Categories />
      <ProductsSlider title={'Hot prices'} filter={item => item}/>
    </main>
  );
}