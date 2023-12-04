import { FC } from 'react';
import { Phone } from '../../types/Phone';

type Props = {
  phone: Phone | undefined,
};

export const PhoneDetail: FC<Props> = ({ phone }) => {
  return (
    <>
      <h1>Page Detail</h1>
      <p>{phone?.name}</p>
    </>
  );
};
