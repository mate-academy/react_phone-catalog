import { SliderTop } from "../SliderTop/SliderTop";
import styles from './HomePage.module.scss';
import { HotPrices } from "../HotPrices/HotPrices";
import { ProductCategory } from "../ProductCategory/ProductCategory";
import { BrandNew } from "../BrandNew/BrandNew";

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <SliderTop />
      {  (
        <>
           <BrandNew />
           {false && (<ProductCategory />)}
      
      <HotPrices />
        </>
   
      )}

    </main>
  );
};
