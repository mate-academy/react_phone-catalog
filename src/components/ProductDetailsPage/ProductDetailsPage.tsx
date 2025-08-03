import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import productStyles from './ProductDetailsPage.module.scss';
import { Iphones } from '../../types/types';
import cn from 'classnames';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';

const ProductDetailsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Iphones[] | []>([]);
  const [numberOfImage, setNumberOfImage] = useState<number>(0);
  const [numberOfColor, setNumberOfColor] = useState<number>(0);
  const [viewProduct, setViewProduct] = useState<Iphones | undefined>(
    undefined,
  );

  const location = useLocation();
  const navigate = useNavigate();

  const gadget = location.pathname.split('/')[2];
  const typeOfGadget = location.pathname.split('/')[1];

  console.log(gadget);
  console.log(typeOfGadget);

  useEffect(() => {
    fetch(`public/api/${typeOfGadget}.json`)
      .then(res => res.json())
      .then((data: Iphones[]) => {
        const foundProduct = data.find((item: Iphones) => item.id === gadget);
        const chosenProdust = data.filter(good => {
          return foundProduct?.id.includes(good.namespaceId);
        });

        setProduct(chosenProdust);

        console.log(foundProduct);

        setViewProduct(foundProduct);
      })
      .finally(() => setLoading(false));
  }, [gadget, setProduct, typeOfGadget]);

  // const foundProduct1 = product.find((item: Iphones) => item.id === gadget);

  // setViewProduct(foundProduct1);

  console.log(typeOfGadget);
  console.log(product);

  const onChangeColor = (color: string) => {
    console.log(color);

    const foundProductGroup = product.filter(good => {
      return good.color === color;
    });

    const foundProduct = foundProductGroup.find(good => {
      return good.capacity === viewProduct?.capacity;
    });

    const newPath = `/${typeOfGadget}/${foundProduct?.id}`;

    console.log(foundProduct);

    navigate(newPath, { replace: true });
    setViewProduct(foundProduct);
  };

  const onChangeCapacity = (capacity: string) => {
    const foundProductGroup = product.filter(good => {
      return good.capacity === capacity;
    });

    const foundProduct = foundProductGroup.find(good => {
      return good.color === viewProduct?.color;
    });

    const newPath = `/${typeOfGadget}/${foundProduct?.id}`;

    console.log(foundProduct);

    navigate(newPath, { replace: true });

    setViewProduct(foundProduct);
  };

  console.log(viewProduct);
  console.log(numberOfImage);

  return (
    <>
      <HeaderLogoMenu />

      <div className={productStyles['product-page']}>
        <div className={productStyles['product-page__path-of-user']}>
          <Link
            to="/"
            className={productStyles['product-page__go-home']}
          ></Link>
          <span className={productStyles['product-page__direction']}></span>
          <Link
            className={productStyles['product-page__previous-page']}
            to={`/${typeOfGadget}?quantity=16&sort=newest`}
          >
            {typeOfGadget}
          </Link>
          <Link
            to={`/${typeOfGadget}/${gadget}`}
            className={productStyles['product-page__current-page']}
          >
            {viewProduct?.name}
          </Link>
        </div>

        <div className={productStyles['product-page__return']}>
          <div className={productStyles['product-page__arrow']}></div>
          <Link className={productStyles['product-page__back']} to={'/'}>
            Back
          </Link>
        </div>

        <h1 className={productStyles['product-page__title']}>
          {viewProduct?.name}
        </h1>

        <div
          className={productStyles['product-page__technical-specifications']}
        >
          <div className={productStyles['product-page__photos']}>
            <div className={productStyles['product-page__photos-list']}>
              {viewProduct?.images.map((photo, i) => {
                return (
                  <>
                    <div
                      key={viewProduct?.id}
                      style={{ backgroundImage: `url('${photo}')` }}
                      onClick={() => setNumberOfImage(i)}
                      className={cn(productStyles['product-page__image'], {
                        [productStyles['product-page__image--active']]:
                          i === numberOfImage,
                      })}
                    />
                  </>
                );
              })}
            </div>

            <div
              className={productStyles['product-page__chosen-photo']}
              style={{
                backgroundImage: `url('${viewProduct?.images[numberOfImage]}')`,
              }}
            ></div>
          </div>

          <div className={productStyles['product-page__tachnical-info']}>
            <div className={productStyles['product-page__colors']}>
              <div>
                <div>Available colors</div>
                {/* <div>{product?.resolution}</div> */}
              </div>

              <div className={productStyles['product-page__wrapper-colors']}>
                {viewProduct?.colorsAvailable.map((color, i) => {
                  console.log(color);

                  return (
                    <>
                      <div
                        // onClick={() => onChangeColor(color)}
                        className={cn(
                          productStyles['product-page__some-color-wrapper'],
                          {
                            [productStyles[
                              'product-page__some-color-wrapper--active'
                            ]]: color === viewProduct?.color,
                          },
                        )}
                      >
                        <button
                          key={color}
                          style={{ backgroundColor: `${color}` }}
                          onClick={() => {
                            onChangeColor(color);
                            setNumberOfColor(i);
                          }}
                          className={cn(
                            productStyles['product-page__some-color'],
                            {
                              [productStyles[
                                'product-page__some-color--active'
                              ]]: color === viewProduct?.color,
                            },
                          )}
                        ></button>
                      </div>
                    </>
                  );
                })}
              </div>

              <div className={productStyles['product-page__capacity']}>
                Select capacity
              </div>

              <div className={productStyles['product-page__memory-buttons']}>
                {viewProduct?.capacityAvailable.map(data => {
                  return (
                    <>
                      <button
                        key={data}
                        onClick={() => onChangeCapacity(data)}
                        className={cn(
                          productStyles[`product-page__capacity-button`],
                          {
                            [productStyles[
                              'product-page__capacity-button--active'
                            ]]: viewProduct?.capacity === data,
                          },
                        )}
                      >
                        {data}
                      </button>
                    </>
                  );
                })}
              </div>

              <div className={productStyles['product-page__price']}>
                <div className={productStyles['product-page__price-discount']}>
                  ${viewProduct?.priceDiscount}
                </div>
                <div className={productStyles['product-page__price-regular']}>
                  ${viewProduct?.priceRegular}
                </div>
              </div>

              <div className={productStyles['product-page__button-list']}>
                <button className={productStyles['product-page__button-add']}>
                  Add to cart
                </button>
                <button
                  className={productStyles['product-page__button-favorites']}
                ></button>
              </div>

              <div className={productStyles['product-page__tech-info']}>
                <div className={productStyles['product-page__tech-type']}>
                  <div className="">Screen</div>
                  <div className="">Resolution</div>
                  <div className="">Processor</div>
                  <div className="">RAM</div>
                </div>

                <div className={productStyles['product-page__tech-meanings']}>
                  <div className={productStyles['product-page__tech-meaning']}>
                    {viewProduct?.screen}
                  </div>
                  <div className={productStyles['product-page__tech-meaning']}>
                    {viewProduct?.resolution}
                  </div>
                  <div className={productStyles['product-page__tech-meaning']}>
                    {viewProduct?.processor}
                  </div>
                  <div className={productStyles['product-page__tech-meaning']}>
                    {viewProduct?.ram}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={productStyles['product-page__text-data']}>
          <div className={productStyles['product-page__block-about']}>
            <h2 className={productStyles['product-page__about-title']}>
              About
            </h2>

            <div>
              {/* <h3>{viewProduct?.description}</h3> */}
              <div>
                {viewProduct?.description.map(item => {
                  console.log(item);

                  return (
                    <>
                      <h3
                        className={
                          productStyles['product-page__describe-title']
                        }
                      >
                        {item?.title}
                      </h3>
                      <div className={productStyles['product-page__describe']}>
                        {item?.text[0]}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={productStyles['product-page__tech-specs']}>
            <h2 className={productStyles['product-page__tech-specs-title']}>
              Tech specs
            </h2>

            <div>
              <div className={productStyles['product-page__tech-info']}>
                <div
                  className={`${productStyles['product-page__tech-type']} ${`${productStyles['product-page__tech-type--advanced']} `}`}
                >
                  <div className="">Screen</div>
                  <div className="">Resolution</div>
                  <div className="">Processor</div>
                  <div className="">RAM</div>
                  <div className="">Built in memory</div>
                  <div className="">Camera</div>
                  <div className="">Zoom</div>
                  <div className="">Cell</div>
                </div>

                <div className={productStyles['product-page__tech-meanings']}>
                  <div
                    className={`${productStyles['product-page__tech-meaning']} ${productStyles['product-page__tech-meaning--advanced']}
                    `}
                  >
                    {viewProduct?.screen}
                  </div>
                  <div
                    className={`${productStyles['product-page__tech-meaning']} ${productStyles['product-page__tech-meaning--advanced']}
                    `}
                  >
                    {viewProduct?.resolution}
                  </div>
                  <div
                    className={`${productStyles['product-page__tech-meaning']} ${productStyles['product-page__tech-meaning--advanced']}
                    `}
                  >
                    {viewProduct?.processor}
                  </div>
                  <div
                    className={`${productStyles['product-page__tech-meaning']} ${productStyles['product-page__tech-meaning--advanced']}
                    `}
                  >
                    {viewProduct?.ram}
                  </div>
                  <div
                    className={`${productStyles['product-page__tech-meaning']} ${productStyles['product-page__tech-meaning--advanced']}
                    `}
                  >
                    {viewProduct?.capacity}
                  </div>
                  <div
                    className={`${productStyles['product-page__tech-meaning']} ${productStyles['product-page__tech-meaning--advanced']}
                    `}
                  >
                    {viewProduct?.camera}
                  </div>
                  <div
                    className={`${productStyles['product-page__tech-meaning']} ${productStyles['product-page__tech-meaning--advanced']}
                    `}
                  >
                    {viewProduct?.zoom}
                  </div>
                  <div
                    className={`${productStyles['product-page__tech-meaning']} ${productStyles['product-page__tech-meaning--advanced']}
                    `}
                  >
                    {viewProduct?.cell}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
