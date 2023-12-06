import { useParams } from 'react-router-dom';
// import { Phone } from '../types/Phone';
import { PhoneDetail } from '../components/Phones/PhoneDetail';
// import { PhoneDetail } from '../components/Phones/PhoneDetail';
import { useGetPhoneByIdQuery } from '../features/phonesApi/api';

// type Data = {
//   phone: Phone;
// };

export const DetailPhonePage = () => {
  const { phoneId } = useParams();
  // const { phone }: Data = useLoaderData() as { phone: Phone };
  const { data } = useGetPhoneByIdQuery(phoneId || '');

  // console.log(data);

  return (
    <>
      <PhoneDetail phone={data} />
    </>

  );
};
