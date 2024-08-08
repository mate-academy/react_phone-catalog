import { CardsCarusel } from '../Cards/CardsCarusel';
import { PicturesSlider } from '../Slider';
import styles from './HomePage.module.scss';
import image1 from './images/00.webp';
// import image2 from './images/01.webp';
import image3 from './images/03.webp';
import image4 from './images/04.png';
import image5 from './images/05.png';
import { Products } from '../../type/Products';
import { Categories } from '../Categories';
import { Context } from '../../Store/Store';
import { Loader } from '../Loader';
import { useContext, useEffect, useState } from 'react';

export const HomePage = () => {
  const { products } = useContext(Context);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    if (products.length !== 0) {
      setDataReceived(true);
    }
  }, [products]);

  const discountProduct: Products[] = products.slice(0, 10);

  return (
    <div>
      {!dataReceived ? (
        <Loader />
      ) : (
        <div>
          <h1 className={styles.title}>Product Catalog</h1>
          <PicturesSlider images={[image1, image3, image4, image5]} />
          {products.length !== 0 && (
            <CardsCarusel props={products} name={'Brand new models'} />
          )}
          <Categories products={products} />
          {discountProduct.length !== 0 && (
            <CardsCarusel
              props={discountProduct}
              discount={true}
              name={'Hot prices'}
            />
          )}
        </div>
      )}
    </div>
  );
};
