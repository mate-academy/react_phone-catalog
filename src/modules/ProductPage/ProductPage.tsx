import { FC, useEffect, useState } from 'react';
import { PageContainer } from '../shared/components/PageContainer';
import { Path } from '../shared/components/Path';
import { useLocation, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Title } from '../shared/components/Title';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { ProductFullInfo } from '../../types/ProductFullInfo';
import { ProductMainDesc } from './components/ProductMainDesc';
import { ProductInfo } from './components/ProductInfo';
import { ProductSection } from '../shared/components/ProductSection';
import { Loader } from '../shared/components/Loader';

export const ProductPage = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);

  const handleCurrentProduct = (): ProductFullInfo | null => {
    const phone = phones.find(
      product => product.id === productId,
    ) as ProductFullInfo;

    if (phone) {
      return phone;
    }

    const tablet = tablets.find(
      product => product.id === productId,
    ) as ProductFullInfo;

    if (tablet) {
      return tablet;
    }

    const accessory = accessories.find(
      product => product.id === productId,
    ) as ProductFullInfo;

    if (accessory) {
      return accessory;
    }

    return null;
  };

  const [currentProduct, setCurrentProduct] = useState<ProductFullInfo | null>(
    null,
  );

  useEffect(() => {
    setCurrentProduct(() => handleCurrentProduct());
    setLoading(false);
  }, [productId]);

  const location = useLocation();

  const from = location.state?.from || 'Home';

  return (
    <>
      {loading ? (
        <Loader />
      ) : currentProduct ? (
        <PageContainer>
          <Path pathName={from} nameOfProduct={currentProduct.name} />
          <Title title={currentProduct.name} />
          <ProductMainDesc
            images={currentProduct.images}
            colorsAvailable={currentProduct.colorsAvailable}
            capacityAvailable={currentProduct.capacityAvailable}
            currentPrice={currentProduct.priceDiscount}
            fullPrice={currentProduct.priceRegular}
            descScreen={currentProduct.screen}
            descCapacity={currentProduct.capacity}
            descRAM={currentProduct.ram}
            currentProduct={currentProduct}
          />
          <ProductInfo
            description={currentProduct.description}
            screen={currentProduct.screen}
            resolution={currentProduct.resolution}
            processor={currentProduct.processor}
            ram={currentProduct.ram}
            memory={currentProduct.capacity}
            camera={currentProduct.camera}
            zoom={currentProduct.zoom}
            cell={currentProduct.cell}
          />
          <ProductSection title={'You may also like'} type={'hot'} />
        </PageContainer>
      ) : (
        <h1>Product was not found</h1>
      )}
    </>
  );
};
