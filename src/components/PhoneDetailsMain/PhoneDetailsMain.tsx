import React, { useEffect, useState, FC } from 'react';
import './_PhoneDetailsMain.scss';
import axios from 'axios';
import { PhoneDetais } from '../PhoneDetais/PhoneDetais';
import { PhoneDetailsInterface } from '../../constants/types';
import { getDataById } from '../../utils/api';

type Props = {
  phoneId: string;
}

export const PhoneDetailsMain: FC<Props> = (props) => {
  const [details, setDetails] = useState<PhoneDetailsInterface
  | null>(null);

  const { phoneId } = props;

  useEffect(() => {
    const url = getDataById(phoneId);

    axios.get(url).then(res => setDetails(res.data));
  }, []);

  return (

    <section className="phoneDetaisMain">
      <div className="phoneDetailsMain__container wrapper">

        {!details ? (
          <div>
            <h2>No such phone</h2>
          </div>
        ) : (
          <PhoneDetais phoneData={details} phoneId={phoneId} />
        )}
      </div>
    </section>

  );
};
