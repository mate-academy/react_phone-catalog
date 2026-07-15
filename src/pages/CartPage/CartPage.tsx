import { useContext } from 'react';
import { CurrentPath } from '../../components/CurrentPath/CurrentPath';
import { CatalogContext } from '../../CatalogContext';
import { CartUnit } from '../../components/CartUnit/CartUnit';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { productCategory } from '../../utils/useUnique';
import { CartTotalSumm } from '../../components/СartTotalSumm/CartTotalSumm';

export const getProductForShow = (
  products: Phone[] | Tablet[] | Accessory[],
) => {
  let uniqueIds: string[] = [];
  let uniqueProductsForShow: Phone[] | Tablet[] | Accessory[] = [];

  if (products) {
    products.forEach(product => {
      switch (product.category) {
        case productCategory.PHONE:
          products?.forEach(phone => {
            if (!uniqueIds.includes(phone.id)) {
              const currentProduct = products?.find(
                item => item.id === phone.id,
              );

              uniqueIds = [...uniqueIds, phone.id];

              if (currentProduct !== undefined) {
                uniqueProductsForShow = [
                  ...uniqueProductsForShow,
                  currentProduct,
                ];
              }
            }
          });
          break;
        case productCategory.TABLET:
          products?.forEach(tablet => {
            if (!uniqueIds.includes(tablet.id)) {
              const currentProduct = products?.find(
                item => item.id === tablet.id,
              );

              uniqueIds = [...uniqueIds, tablet.id];

              if (currentProduct !== undefined) {
                uniqueProductsForShow = [
                  ...uniqueProductsForShow,
                  currentProduct,
                ];
              }
            }
          });
          break;
        default:
          products?.forEach(accessory => {
            if (!uniqueIds.includes(accessory.id)) {
              const currentProduct = products?.find(
                item => item.id === accessory.id,
              );

              uniqueIds = [...uniqueIds, accessory.id];

              if (currentProduct !== undefined) {
                uniqueProductsForShow = [
                  ...uniqueProductsForShow,
                  currentProduct,
                ];
              }
            }
          });
      }
    });
  }

  uniqueProductsForShow = uniqueProductsForShow.sort((a, b) =>
    a.id.localeCompare(b.id),
  );

  return uniqueProductsForShow;
};

export const CartPage = () => {
  const { cart } = useContext(CatalogContext);

  return (
    <section className="cart first-screen">
      <div className="container">
        <CurrentPath />
        <h1 className="main-title cart__title">Cart</h1>
        {getProductForShow(cart).length > 0 ? (
          <div className="cart__wrapper">
            <div className="cart__main-item">
              {getProductForShow(cart).map(item => (
                <CartUnit key={item.id} product={item} />
              ))}
            </div>
            <div className="cart__main-item">
              <CartTotalSumm />
            </div>
          </div>
        ) : (
          <p className="sub-info">Empty</p>
        )}
      </div>
    </section>
  );
};
