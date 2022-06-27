import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getProductDetails } from '../api/getProductDetails';
import { DetailsOfProduct } from '../types/DetailsOfProduct';
import BreadCrumbs from '../components/BreadCrumbs';
import { Product } from '../types/Product';
import ProductButtons from '../components/ProductButtons';
import TechSpecs from '../components/TechSpecs';
import ProductSlider from '../components/ProductSlider';

type Props = {
  list: Product[];
};

const ProductDetails:React.FC<Props> = ({ list }) => {
  const [productDetails, setProductDetails]
  = useState<DetailsOfProduct | null>(null);
  const [bigImg, setBigImg] = useState('');
  const { phoneId } = useParams();
  const location = useLocation();
  const path = location.pathname;

  const shortSpec = [
    { name: 'Screen', spec: productDetails?.display.screenSize },
    { name: 'Resolution', spec: productDetails?.display.screenResolution },
    { name: 'Proccessor', spec: productDetails?.hardware.cpu },
    { name: 'RAM', spec: productDetails?.storage.ram },
  ];

  const mainSpec = [
    { name: 'Screen', spec: productDetails?.display.screenSize },
    { name: 'Resolution', spec: productDetails?.display.screenResolution },
    { name: 'Proccessor', spec: productDetails?.hardware.cpu },
    { name: 'Built in memory', spec: productDetails?.storage.ram },
    { name: 'Camera', spec: `${productDetails?.camera.primary} ${productDetails?.camera.features}` },
    { name: 'OS', spec: productDetails?.android.os },
    { name: 'Battery', spec: productDetails?.battery.type },
    { name: 'bluetooth', spec: productDetails?.connectivity.bluetooth },
  ];

  const forSlider = list.slice(0, 10);

  const fetchData = async () => {
    const res = await getProductDetails(phoneId || '');

    setProductDetails(res);
    setBigImg(res.images[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!productDetails) {
    return <h1> Not found</h1>;
  }

  const productInfo = list.find(product => (
    product.id === productDetails.id));

  return (
    <section className="ProductDetails">
      <BreadCrumbs location={path} />
      {productDetails && (
        <>
          <h1 className="ProductDetails__title">{productDetails.name}</h1>
          <div className="ProductDetails__mainInformation">
            <div className="ProductDetails__img-container">
              <ul className="ProductDetails__img-list">
                {productDetails.images.map(image => (
                  <li
                    key={image}
                    onMouseEnter={() => setBigImg(image)}
                  >
                    <img
                      src={`/${image}`}
                      alt="img-phone"
                      className="ProductDetails__small-img"
                    />
                  </li>
                ))}
              </ul>
              <div className="ProductDetails__big-img">
                <img src={`/${bigImg}`} alt="img-phone-main" />
              </div>
            </div>
            <div className="ProductDetails__mainSpec">
              <p className="card__price">
                <span
                  className="card__price--discount"
                >
                  {`$${productInfo?.newPrice}`}
                </span>
                {(productInfo?.discount && productInfo?.discount > 1) && <span className="card__price--oldPrice">{`$${productInfo?.price}`}</span>}
              </p>
              <div className="ProductDetails__buttons">
                <ProductButtons bigSize id={productDetails.id} />
              </div>
              <TechSpecs list={shortSpec} />
            </div>
          </div>
          <div className="ProductDetails__description">
            <article className="ProductDetails__article">
              <h2 className="ProductDetails__section-title">
                About
              </h2>
              <h3 className="ProductDetails__article-title">
                Description
              </h3>
              <p className="ProductDetails__content">
                {productDetails.description}
              </p>
            </article>
            <article className="ProductDetails__article">
              <h2 className="ProductDetails__section-title">
                Tech specs
              </h2>
              <TechSpecs list={mainSpec} />
            </article>
            <article className="ProductDetails__article">
              <h3 className="ProductDetails__article-title">
                Camera
              </h3>
              <p className="ProductDetails__content">
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to
                four times more scene. Get beautiful images in drastically
                lower light.
                Shoot the highest‑quality video in a smartphone — then edit
                with the same tools you love for photos. You’ve never shot with
                anything like it.
              </p>
            </article>
          </div>
          <ProductSlider title="You may also like" list={forSlider} />
        </>
      )}
    </section>
  );
};

export default ProductDetails;
