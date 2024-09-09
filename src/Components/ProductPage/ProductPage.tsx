import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import './ProductPage.scss';
import { useContext, useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsFilter } from '../ProductsFilter/ProductsFilter';
import { FilterType } from '../types/FilterType';
import { CatalogContext } from '../CatalogProvider';

export const PhonesPage = () => {
  const { products, setProducts, phones, filter } = useContext(CatalogContext);

  const filteredOptions = (allPhones: FilterType) => {
    const phonesProduct = products.filter(
      product => product.category === 'phones',
    );

    switch (allPhones) {
      case FilterType.TheMostExpensive:
        return phonesProduct.sort((a, b) => b.price - a.price);
      case FilterType.TheCheapest:
        return phonesProduct.sort((a, b) => a.price - b.price);
      case FilterType.Allphabetically:
        return phonesProduct.sort((a, b) => a.name.localeCompare(b.name));
      case FilterType.AllphabeticallyDescending:
        return phonesProduct.sort((a, b) => b.name.localeCompare(a.name));
      case FilterType.TheNewest:
        return phonesProduct.sort((a, b) => b.year - a.year);
      case FilterType.TheOldest:
        return phonesProduct.sort((a, b) => a.year - b.year);
      case FilterType.GoldColor:
        return phonesProduct.filter(phone => phone.color === 'gold');
      case FilterType.BlackColor:
        return phonesProduct.filter(phone => phone.color === 'black');
      case FilterType.GraphiteColor:
        return phonesProduct.filter(phone => phone.color === 'graphite');
      case FilterType.RedGoldColor:
        return phonesProduct.filter(phone => phone.color === 'redgold');
      case FilterType.SierrablueColor:
        return phonesProduct.filter(phone => phone.color === 'sierrablue');
      case FilterType.SpaceBlackColor:
        return phonesProduct.filter(phone => phone.color === 'spaceblack');
      case FilterType.RedColor:
        return phonesProduct.filter(phone => phone.color === 'red');
      case FilterType.WhiteColor:
        return phonesProduct.filter(phone => phone.color === 'white');
      case FilterType.YellowColor:
        return phonesProduct.filter(phone => phone.color === 'yellow');
      case FilterType.Capacity_32_GB:
        return phonesProduct.filter(phone => phone.capacity === '32GB');
      case FilterType.Capacity_64_GB:
        return phonesProduct.filter(phone => phone.capacity === '64GB');
      case FilterType.Capacity_128_GB:
        return phonesProduct.filter(phone => phone.capacity === '128GB');
      case FilterType.Capacity_256_GB:
        return phonesProduct.filter(phone => phone.capacity === '256GB');
      case FilterType.Capacity_512_GB:
        return phonesProduct.filter(phone => phone.capacity === '512GB');
      case FilterType.Capacity_1_TB:
        return phonesProduct.filter(phone => phone.capacity === '1TB');
      case FilterType.AllPhones:
        return phonesProduct;
      default:
        return phonesProduct;
    }
  };

  const filteredPhones = filteredOptions(filter);

  useEffect(() => {
    const fullProductData = products.map(product => {
      const appropriatePhone = phones.find(
        phone => phone.id === product.itemId,
      );

      return {
        ...product,
        ProductData: appropriatePhone || null,
      };
    });

    setProducts(fullProductData);
  }, []);

  return (
    <>
      <Navigation />
      <div className="phonespage">
        <Link to="/home" className="phonespage__breadcrumbs--link">
          <div className="phonespage__breadcrumbs--image"></div>
        </Link>

        <h1 className="phonespage__header">Mobile phones</h1>
        <span className="phonespage__amountofmodels">{`${products.length} models`}</span>
        <ProductsFilter />
        <div className="phonespage__content">
          {filteredPhones.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
