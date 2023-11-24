import React from 'react';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
// import { useProducts } from '../../helpers/CatalogContext/CatalogContext';

export const PhonesPage: React.FC = () => {
  // const { phones, setPhones } = useProducts();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getPhones();

  //       setPhones(data);
  //     } catch (error) {
  //       throw new Error();
  //     }
  //   };

  //   fetchData();
  // }, [setPhones]);

  return (
    <>
      <h1>Phones Page</h1>
      {/* <p>{`phones arr length is: ${phones.length}`}</p> */}

      <ProductsSlider />

      {/* {phones.map(phone => (
        <ul key={phone.id}>
          <h1>{phone.name}</h1>
          <img src={`_new/${phone.image}`} alt={phone.name} />
          <p>url</p>
        </ul>
      ))} */}
    </>
  );
};
