import React, { useState } from 'react';
import { ItemsPerPage } from './Drowbox';

export default function Drowbox() {
  const [itemsPerPage, setItemsPerPage] = useState(16);

  return (
    <div>
      <ItemsPerPage value={itemsPerPage} onChange={setItemsPerPage} />
    </div>
  );
}
