import { useLocation, useParams } from 'react-router-dom';
import { ProductNav } from './../component/ProductsList/ProductNav/ProductNav';
import style from './ProductDetails.module.scss';
import { BackLink } from './../component/BackLink/BackLink';
import { ProductCharacteristics } from './ProductCharacteristics';
import { useEffect, useState } from 'react';
import { TypeGadget } from './../types/Gadget';
import { Products } from './../types/Products';
import { getGadget } from './../component/utils/gadgets';
import { getProductById } from './../component/utils/sortingProducts';
import { Loader } from './../component/modules/Loader';

type Category = 'phones' | 'tablets' | 'accessories';

export const ProductDetails = () => {
  const [currentGadget, setCurrentGadget] = useState<TypeGadget | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1] as Category;
  const fromCategory = location.state?.from || '/';
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const gadget = await getGadget(category, id);
        const product = await getProductById(id);

        setCurrentGadget(gadget);
        setCurrentProduct(product);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={style.ProductDetails}>
      <div className={style.ProductDetails__nav}>
        <ProductNav />
        <BackLink fromCategory={fromCategory} />
      </div>

      {currentGadget && currentProduct ? (
        <>
          <ProductCharacteristics
            gadget={currentGadget}
            products={currentProduct}
          />
        </>
      ) : (
        <div>
          <p>Product was not found</p>
          <img src="/img/product-not-found.png" alt="Product not found" />
        </div>
      )}
    </div>
  );
};
