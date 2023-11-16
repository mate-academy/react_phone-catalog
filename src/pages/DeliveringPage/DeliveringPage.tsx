import React from 'react';

import {
  deliveringPageSectionItems,
} from '../../helpers/deliveringPageSectionItems';

import {
  DeliveringSection,
} from '../../components/DeliveringSection/DeliveringSection';

import './DeliveringPage.scss';

export const DeliveringPage: React.FC = React.memo(() => {
  return (
    <main className="delivering">
      <div className="container">
        <section className="delivering__section">
          {deliveringPageSectionItems.map(item => {
            const { name, className, numberOfItems } = item;

            return (
              <DeliveringSection
                key={name}
                rootName={name}
                rootClassName={className}
                numberOfItems={numberOfItems}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
});
