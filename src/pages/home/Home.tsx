import { useContext } from 'react';
import { BanerSlider } from '../../components/banerSlider/BanerSlider';
import { Catalogs } from '../../components/catalogs/Catalogs';
import { Loader } from '../../components/Loader/Loader';
import { Catalog } from '../../components/productSlider/ProductSlider';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';
import './home.scss';

export const Home = () => {
  const [state] = useContext(GlobalContext);

  return (
    <section className="contant">
      {
        state.loader
          ? <Loader />
          : (
            <>
              <BanerSlider />
              <Catalog
                title="Hot prices"
                list={
                  state.catalogsProducts.filter((el:Product) => el.discount)
                }
              />
              <Catalogs />
              <Catalog
                title="Brand new models"
                list={
                  state.catalogsProducts.filter((el:Product) => !el.discount)
                }
              />
            </>
          )
      }

    </section>
  );
};
