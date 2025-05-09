import { useParams } from 'react-router-dom';
import data from '@/api/phones.json';
import { PhoneDetailsPage } from '@/components/PhoneDetailsPage';

export const PhoneDetailsWrapper = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <div>Invalid address</div>;
  }

  const parts = slug?.split('-');
  const color = parts.pop();
  const capacity = parts.pop();
  const namespaceId = parts.join('-');

  const product = data.find(
    p =>
      p.namespaceId === namespaceId &&
      p.capacity.toLowerCase() === capacity?.toLowerCase() &&
      p.color === color,
  );

  return <PhoneDetailsPage product={product} />;
};
