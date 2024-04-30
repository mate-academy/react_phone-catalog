// import React, { useState } from 'react';
// import { Product } from '../../types/Product';

// type Props = {
//   product: Product[];
// };

// const Pagination: React.FC = ({ product }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(5);

//   const lastCardIndex = currentPage * perPage;
//   const firstCardIndex = lastCardIndex - perPage;
//   const itemsData = product.slice(firstCardIndex, lastCardIndex);
//   const totalCard = product.length;

//   const handleSelectChange: React.ChangeEventHandler<
//     HTMLSelectElement
//   > = event => {
//     setPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (number: number) => {
//     setCurrentPage(number);
//   };

//   return <div>Pagination</div>;
// };

// export default Pagination;
