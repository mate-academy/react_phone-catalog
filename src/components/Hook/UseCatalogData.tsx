import { Phone } from "../../Types/type";
import { useLocation } from 'react-router-dom';
import phones from '../../../public/api/phones.json'
import tablets from '../../../public/api/tablets.json'
import accessories from '../../../public/api/accessories.json'
import { useState } from "react";


export const UseCatalogData = () => {
  const location = useLocation();
  let data: Phone[] = [];

  if (location.pathname === '/phones') {
    data = phones;
  } else if (location.pathname === '/tablets') {
    data = tablets;
  } else if (location.pathname === '/accessories') {
    data = accessories
  }

  const [itemsOnPage, setItemsOnPage] = useState<Phone[]>(
    data.slice(0, 16),
  );
  return { itemsOnPage, setItemsOnPage };
};

export default UseCatalogData;