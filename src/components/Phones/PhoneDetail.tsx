import { FC } from 'react';
import { Phone } from '../../types/Phone';
import { Box } from '../../UI/Box';

type Props = {
  phone: Phone | undefined,
};

export const PhoneDetail: FC<Props> = ({ phone }) => {
  return (
    <Box>
      <h1>Page Detail</h1>
      <p>{phone?.name}</p>
    </Box>
  );
};
