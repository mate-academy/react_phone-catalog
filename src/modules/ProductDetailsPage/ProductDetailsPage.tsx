import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import style from './ProductDetailsPage.module.scss';
import { ProductData } from '../../types/ProductData';
import { useEffect, useState } from 'react';
import { client } from '../../utils/fetchClients';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { init } from '../../features/products';
import { Loader } from '../../components/Loader';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const category = location.split('/').slice(1, 2).join();
  const navigate = useNavigate();

  const products = useAppSelector(state => state.products.items);
  const productFromRedux = products.find(item => item.itemId === productId);

  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(
    null,
  );
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    client
      .get<ProductData[]>(`api/${category}.json`)
      .then(data => {
        const product = data.find(item => item.id === productId);

        setCurrentProduct(product || null);
      })
      .finally(() => setLoader(false));

    if (!products.length) {
      dispatch(init());
    }
  }, [category, dispatch, productId, products.length]);

  return (
    <article className={style.productDetails}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs name={productFromRedux?.name} />
      </div>

      <a className={style.backButton} onClick={() => navigate(`/${category}`)}>
        <div className={style.backButton__arrow} />
        <p className={style.backButton__text}>Back</p>
      </a>

      {loader && <Loader />}
      <h1 className={style.title}>{currentProduct?.name}</h1>
    </article>
  );
};
