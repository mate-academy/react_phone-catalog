import React, { FC, useState, useEffect, useMemo } from 'react';

import { URL_PHONE } from '../constants/api';

export const Phonescatalog: FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    fetch(URL_PHONE)
      .then(async data => setPhones(await data.json()));
  }, []);

  console.log(setPhones);

  return (
    <main className="main">
      <h1>Phones page))</h1>
    </main>
  );
};
