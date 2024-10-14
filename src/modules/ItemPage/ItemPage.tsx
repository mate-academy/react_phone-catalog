import BreadCrumbs from '../_shared/BreadCrumbs/BreadCrumbs';
import {
  AboutInfoStyled,
  AboutSpecsStyled,
  AboutStyled,
  ImagesStyled,
  ImgMiniBlockStyled,
  InfoSpecsSecStyled,
  InfoSpecsStyled,
  ItemPageStyled,
  MainImgStyled,
  MainInfoStyled,
  MiniImg,
  SpecsStyled,
  TitleNameStyled,
  TitleStyled,
} from './styled';
import GoBack from '../_shared/GoBack/GoBack';
import useProduct from '../../hooks/useProduct';
import { useState } from 'react';
import ItemInfo from './ItemInfo/ItemInfo';
import { StrCode } from '../../utils/enums';
import { useTranslation } from 'react-i18next';
import ProductsSlider from '../_shared/ProductsSlider/ProductsSlider';
import { useAppSelector } from '../../hooks/hookStore';
import { shuffleAndTrimArray } from '../../utils/const';
import { NotFoundImg, ProductsNotFound } from '../ProductsPage/styled';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../_shared/Skeleton/Skeleton';

const ItemPage = () => {
  const [activeImg, setActiveImg] = useState(0);
  const { product } = useProduct();
  const { t } = useTranslation();
  const { products } = useAppSelector(state => state.products);
  const productsAlsoLike = shuffleAndTrimArray([...products]);
  const navigate = useNavigate();

  return (
    <ItemPageStyled>
      <BreadCrumbs />

      <GoBack />

      {!!product && !!products.length ? (
        <>
          <TitleStyled>{product.name}</TitleStyled>

          <MainInfoStyled>
            <ImagesStyled>
              <ImgMiniBlockStyled>
                {product.images.map((item, index) => (
                  <MiniImg
                    isActive={index === activeImg}
                    src={item}
                    key={index}
                    onClick={() => setActiveImg(index)}
                  />
                ))}
              </ImgMiniBlockStyled>

              <MainImgStyled src={product.images[activeImg]} />
            </ImagesStyled>

            <ItemInfo product={product} />
          </MainInfoStyled>

          <AboutSpecsStyled>
            <AboutStyled>
              <TitleNameStyled>{t(StrCode.About)}</TitleNameStyled>

              {product.description.map(item => (
                <AboutInfoStyled key={item.title}>
                  <div>{item.title}</div>
                  <div>{item.text}</div>
                </AboutInfoStyled>
              ))}
            </AboutStyled>

            <SpecsStyled>
              <TitleNameStyled>{t(StrCode.TechSpecs)}</TitleNameStyled>

              <InfoSpecsStyled>
                <div>
                  {t(StrCode.Screen)}
                  <InfoSpecsSecStyled>{product.screen}</InfoSpecsSecStyled>
                </div>

                <div>
                  {t(StrCode.Resolution)}
                  <InfoSpecsSecStyled>{product.resolution}</InfoSpecsSecStyled>
                </div>

                <div>
                  {t(StrCode.Processor)}
                  <InfoSpecsSecStyled>{product.processor}</InfoSpecsSecStyled>
                </div>

                <div>
                  {t(StrCode.Ram)}
                  <InfoSpecsSecStyled>{product.ram}</InfoSpecsSecStyled>
                </div>

                <div>
                  {t(StrCode.BuiltMemory)}
                  <InfoSpecsSecStyled>{product.capacity}</InfoSpecsSecStyled>
                </div>

                {!!product.camera && (
                  <div>
                    {t(StrCode.Camera)}
                    <InfoSpecsSecStyled>{product.camera}</InfoSpecsSecStyled>
                  </div>
                )}

                {!!product.zoom && (
                  <div>
                    {t(StrCode.Zoom)}
                    <InfoSpecsSecStyled>{product.zoom}</InfoSpecsSecStyled>
                  </div>
                )}

                <div>
                  {t(StrCode.Cell)}
                  <InfoSpecsSecStyled>
                    {product.cell.join(', ')}
                  </InfoSpecsSecStyled>
                </div>
              </InfoSpecsStyled>
            </SpecsStyled>
          </AboutSpecsStyled>

          <ProductsSlider
            name={'You may also like'}
            products={productsAlsoLike}
          />
        </>
      ) : (
        !products.length && <Skeleton width="100%" height="100vh" />
      )}

      {!product && !!products.length && (
        <ProductsNotFound>
          {t(StrCode.ProductNot)}

          <Button
            variant="dark"
            css="align-self: center;"
            onFunc={() => navigate('/')}
          >
            {t(StrCode.GoHome)}
          </Button>

          <NotFoundImg src="/react_phone-catalog/img/product-not-found.png" />
        </ProductsNotFound>
      )}
    </ItemPageStyled>
  );
};

export default ItemPage;
