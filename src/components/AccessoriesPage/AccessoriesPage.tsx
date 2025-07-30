import { useEffect, useState } from 'react';
import { AccessoryInfoType } from '../../types/AccessoryInfoType';
import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { useCurrentPath } from '../contexts/PathContext';

export const AccessoriesPage: React.FC = ({ }) => {
  const [accessories, setAccessories] = useState<AccessoryInfoType[]>([]);
  const [totalAccessoriesModels, setTotalAccessoriesModels] = useState(0);

  const currentPath = useCurrentPath();

  useEffect(() => {
    fetch('/api/accessories.json')
      .then(res => res.json())
      .then((data: AccessoryInfoType[]) => {
        const accessories = data.filter(
          accessory => accessory.category === 'accessories',
        );
        const allAccessoriesModels = data.length;

        setTotalAccessoriesModels(allAccessoriesModels);
        setAccessories(accessories);
      })
      .catch(err => console.error('Ошибка загрузки телефонов:', err));
  }, []);

  return (
    <>
      <BreadcrumbsNav />
    <div>Accessories Page{currentPath}</div>
    </>

    // <p>Текущий путь: </p>;

  )
}
