import { ProductType } from '../enums/ProductType';
import { Product } from '../types/Product';
import { ProductInfo } from '../types/ProductInfo';

const PRODUCTS_URL
= 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export function getProducts(
  type: ProductType = ProductType.all,
): Promise<Product[]> {
  return fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then((responseJson: Product[]) => {
      const receivedProduct = responseJson.map(product => {
        const { price, discount } = product;

        const totalDiscount = (price * discount) / 100;

        return {
          ...product,
          discountedPrice: +(price - totalDiscount).toFixed(2),
        };
      });

      return type === ProductType.all
        ? receivedProduct
        : receivedProduct.filter(product => product.type === type);
    });
}

export function getPhones() {
  return getProducts(ProductType.phone);
}

export function getTablets() {
  return getProducts(ProductType.tablet);
}

export function getAccessories() {
  return getProducts(ProductType.accessories);
}

export function getProductFullInfo(productId?: string): Promise<ProductInfo> {
  if (!productId) {
    throw new Error('Product not found');
  }

  const PRODUCT_URL = `https://mate-academy.github.io/react_phone-catalog/api/products/${productId}.json`;

  return fetch(PRODUCT_URL)
    .then(response => response.json());
}

export function getBrandNewProducts() {
  return getProducts()
    .then(products => {
      return products
        .filter(product => product.discount === 0)
        .sort((p1, p2) => p2.price - p1.price);
    });
}

function getAbsoluteDiscount({ price, discount }: Product) {
  return (price * discount) / 100;
}

export function getHotPriceProducts() {
  return getProducts()
    .then(products => {
      return products
        .filter(product => product.discount > 0)
        .sort(
          (p1, p2) => getAbsoluteDiscount(p2) - getAbsoluteDiscount(p1),
        );
    });
}

export function getId(productId?: string) {
  switch (productId) {
    case 'motorola-atrix-4g':
      return 802390;
    case 'samsung-gem':
      return 802391;
    case 'dell-venue':
      return 802392;
    case 'nexus-s':
      return 802393;
    case 'lg-axis':
      return 802394;
    case 'samsung-showcase-a-galaxy-s-phone':
      return 802395;
    case 'droid-2-global-by-motorola':
      return 802396;
    case 'droid-pro-by-motorola':
      return 802397;
    case 'motorola-bravo-with-motoblur':
      return 802398;
    case 'motorola-defy-with-motoblur':
      return 802399;
    case 't-mobile-mytouch-4g':
      return 802399;
    case 'samsung-mesmerize-a-galaxy-s-phone':
      return 802400;
    case 'sanyo-zio':
      return 802401;
    case 'samsung-transform':
      return 802402;
    case 't-mobile-g2':
      return 802403;
    case 'motorola-charm-with-motoblur':
      return 802404;
    case 'motorola-xoom-with-wi-fi':
      return 802405;
    case 'motorola-xoom':
      return 802406;
    case 'dell-streak-7':
      return 802407;
    case 'samsung-galaxy-tab':
      return 802408;
    default:
      return 0;
  }
}

export function getSuggestedProducts(withoutId: string) {
  return getProducts()
    .then(products => {
      let productsBeforeMix = products.filter(
        product => product.id !== withoutId,
      );
      const mixedProducts: Product[] = [];

      while (productsBeforeMix.length) {
        const chosenIndex = Math.floor(
          Math.random() * productsBeforeMix.length,
        );
        const chosenProduct = productsBeforeMix[chosenIndex];

        mixedProducts.push(chosenProduct);
        productsBeforeMix = productsBeforeMix.filter(
          product => product.id !== chosenProduct.id,
        );
      }

      return mixedProducts;
    });
}
