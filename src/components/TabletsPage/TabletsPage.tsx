import { TabletInfoType } from "../../types/TabletInfoType";
import { useEffect, useState } from 'react';
import { useCurrentPath } from '../contexts/PathContext';
import { BreadcrumbsNav } from "../BreadcrumbsNav";

export const TabletsPage: React.FC = ({


}) => {
  const [tablets, setTablets] = useState <TabletInfoType[]>([]);
  const [totalTabletsModels, setTotalTabletsModels] = useState(0);
  const currentPath = useCurrentPath();

  useEffect (() => {
    fetch('/api/tablets.json')
      .then(res => res.json())
      .then((data: TabletInfoType[]) => {
        const tablets = data.filter(tablet => tablet.category === 'tablets');
        const allTabletModels = data.length;

        setTotalTabletsModels(allTabletModels);
        setTablets(tablets);
      })
      .catch(err => console.error('Ошибка загрузки телефонов:', err));
  }, []);
  return (
    <>
      <BreadcrumbsNav />
      <div>TABLETS{currentPath}</div>
    </>
  )
}
