import './mobilePhonesPage.scss';
import { useEffect, useState } from 'react';
import { PhoneInfoType } from '../../types/PhoneInfoType';
import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { useCurrentPath } from '../contexts/PathContext';
import { PhoneCard } from '../PhoneCard';
import { AllProductsType } from '../../types/AllProductsType';

export const MobilePhonesPage: React.FC = ({}) => {
  const [newPhones, setNewPhones] = useState<AllProductsType[]>([]);
  const [discountedPhones, setDiscountedPhones] = useState<AllProductsType[]>(
    [],
  );
  const [totalPhoneModels, setTotalPhoneModels] = useState(0);
  const [phones, setPhones] = useState<AllProductsType[]>([]);

  const currentPath = useCurrentPath();

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => {
        const phones = data.filter(phone => phone.category === 'phones');

        const newModels = phones.filter(phone => phone.itemId.includes('14-pro'));
        const hotPrices = phones.filter(phone => phone.itemId.includes('13-pro'));
        const allPhoneModels = phones.length;

        setNewPhones(newModels);
        setDiscountedPhones(hotPrices);
        setTotalPhoneModels(allPhoneModels);
        setPhones(phones);
      })
      .catch(err => console.error('Ошибка загрузки телефонов:', err));
  }, []);

  return (
    <div className="category-page">
      <BreadcrumbsNav />

      <div className="title-models-block">
        <div className="category-title">Mobile Phones</div>

        <p className="main-body-text-14">{totalPhoneModels} models</p>
      </div>

      <div className="category-models">
        {phones.map(product => (
          <PhoneCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
