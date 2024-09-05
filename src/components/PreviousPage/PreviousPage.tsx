import { useAppContext } from '../../context/AppContext';
import React, { useEffect } from 'react';

type PreviousPageProps = {
  category: string;
}

export const PreviousPage: React.FC<PreviousPageProps> = ({category}) => {
  const { previousCurrentPage, setPreviousCurrentPage } = useAppContext()

  useEffect(() => {
    const pages = [...previousCurrentPage];
    pages.shift()
    pages.push(category)
    setPreviousCurrentPage(pages)
  }, [category]);

  return (
    <></>
  );
}
