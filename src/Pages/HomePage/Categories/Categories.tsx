import { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../../api';
import { AccessoriesModel, PhoneModel } from '../../../types/model';
import { Category } from '../Category';
import phonesImg from '../../../images/phones.png';
import accessoriesImg from '../../../images/accessories (1).png';
import tabletsImg from '../../../images/tablets.png';
import './Categories.scss';

export const Categories = () => {
  const [phones, setPhones] = useState<PhoneModel[]>();
  const [tablets, setTablets] = useState<PhoneModel[]>();
  const [accessories, setAccessories] = useState<AccessoriesModel[]>();

  useEffect(() => {
    const fetchedPhones = getPhones();

    fetchedPhones.then(p => {
      setPhones(p);
      const fetchedTablets = getTablets();

      fetchedTablets.then(t => {
        setTablets(t);
      });
      const fetchedAccessories = getAccessories();

      fetchedAccessories.then(a => {
        setAccessories(a);
      });
    });
  }, []);

  return (
    <section className="categories">
      <ul className="category__list">
        <li className="category__list-item phones">
          <Category
            categoryLength={phones?.length}
            categoryPath="phones"
            categoryName="Mobile phones"
            imgSrc={phonesImg}
          />
        </li>
        <li className="category__list-item tablets">
          <Category
            categoryLength={tablets?.length}
            categoryPath="tablets"
            categoryName="Tablets"
            imgSrc={tabletsImg}
          />
        </li>
        <li className="category__list-item accessories">
          <Category
            categoryLength={accessories?.length}
            categoryPath="accessories"
            categoryName="Accessories"
            imgSrc={accessoriesImg}
          />
        </li>
      </ul>
    </section>
  );
};
