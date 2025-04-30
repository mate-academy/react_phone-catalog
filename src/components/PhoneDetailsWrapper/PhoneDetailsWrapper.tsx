import { useParams } from 'react-router-dom';
import data from '@/api/phones.json';
import { PhoneDetailsPage } from '@/components/PhoneDetailsPage';

export const PhoneDetailsWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = data.find(p => p.id === slug);

  return <PhoneDetailsPage product={product} />;
};
