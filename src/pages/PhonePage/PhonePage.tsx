import { useEffect, useState } from 'react';
import './PhonePage.scss';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { getPhones } from '../../helpers/getPhones';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Loader } from '../../components/Loader';
import { DropDown } from '../../components/DropDown';

export const PhonePage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  let sortedPhones = phones;

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');

  if (sortBy === 'age') {
    sortedPhones = phones.sort((a, b) => a.age - b.age);
  }

  if (sortBy === 'name') {
    sortedPhones = phones.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === 'price') {
    sortedPhones = phones.sort((a, b) => a.price - b.price);
  }

  useEffect(() => {
    setIsLoading(true);
    getPhones()
      .then(data => {
        setPhones(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Mobile phones</h1>
      <p className="phones-count">95 models</p>
      <div className="catalog__settings">
        <DropDown />
      </div>

      {isLoading && <Loader />}
      {!isLoading && <ProductsList phones={sortedPhones} />}
    </div>
  );
};
