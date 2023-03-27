import { FC, useState, useEffect } from 'react';
import { Pagination } from '../../Components/Pagination/Pagination';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { getPhones } from '../../utils/API';
import './PhonePage.scss';

export const PhonePage: FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const fetchPhones = async () => {
    try {
      const phonesFromAPI = await getPhones();

      setPhones(phonesFromAPI);
    } catch {
      throw Error();
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <>
      <h1 className="phonePage__title">Mobile phones</h1>
      <p className="phonePage__subTitle">{`${phones.length} models`}</p>

      <form className="phonePage__sortForm">
        <div>
          <p className="phonePage__label">
            Sort by
          </p>
          <select
            className="phonePage__select phonePage__select--sort"
            value="age"
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>
        <div>
          <p className="phonePage__label">
            Items on page
          </p>
          <select
            className="phonePage__select phonePage__select--itemPerPage"
            value="All"
          >
            <option value="All">All</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
      </form>

      <div className="phonePage__productList" data-cy="productList">
        {phones.map(phone => (
          <div className="productCard" key={phone.id}>
            <ProductCard product={phone} isDiscount={false} />
          </div>
        ))}
      </div>

      <div className="phonePage__pagination">
        <Pagination amount={5} />
      </div>
    </>
  );
};
