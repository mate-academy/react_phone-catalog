import React from 'react';
import { Disclosure } from '@headlessui/react';

type Props = {
  rootClassName: string,
  title: string,
  description: string,
};

export const Accordion: React.FC<Props> = React.memo(({
  rootClassName,
  title,
  description,
}) => {
  return (
    <div className={`${rootClassName}-accordion`}>
      <Disclosure>
        <Disclosure.Button className={`${rootClassName}-accordion-title`}>
          {title}
        </Disclosure.Button>

        <Disclosure.Panel className={`${rootClassName}-accordion-description`}>
          {description}
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
});
