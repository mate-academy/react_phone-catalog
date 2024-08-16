import { useAppContext } from '../../context/AppContext';
import React, { useEffect } from 'react';

type PreviousPageProps = {
  category: string;
}

export const PreviousPage: React.FC<PreviousPageProps> = ({category}) => {
  const { setPreviousPage } = useAppContext()
  useEffect(() => {

    setPreviousPage(category);
    console.log(category)
  }, [category]);


  return (
    <></>
  )
  ;
}
