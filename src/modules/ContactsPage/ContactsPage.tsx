import React from 'react';
import { BreadcrumbsNav } from '@/shared/components/BreadcrumbsNav';
import { BackHeader } from '@/shared/components/BackHeader';
import myPhoto from '@/shared/assets/avatar-dev.webp';

import './ContactsPage.scss';

const CONTACT_LINKS = [
  {
    label: 'GitHub',
    value: 'Web-store "Nice Gadgets" ',
    href: 'https://github.com/Grigoriy01/react_phone-catalog',
    isExternal: true,
  },
  {
    label: 'GitHub',
    value: 'mini-game "2048" ',
    href: 'https://github.com/Grigoriy01/react_phone-catalog',
    isExternal: true,
  },
  {
    label: 'Email',
    value: 'nikgrigoriy777@gmail.com',
    href: 'mailto:nikgrigoriy777@gmail.com',
    isExternal: false,
  },
  {
    label: 'WhatsApp',
    value: '+49 162 155 38 78',
    href: 'https://wa.me/+491621553878',
    isExternal: true,
  },
];

export const ContactsPage: React.FC = () => {
  return (
    <div className="contacts-page container">
      <BreadcrumbsNav className="contacts-page__breadcrumbs" />
      <BackHeader catalogTitle="Contacts" className="contacts-page__header" />

      <section className="contacts-page__content">
        {/* developer profile */}
        <div className="contacts-page__developer-card">
          <div className="contacts-page__avatar-wrapper">
            {/* Avatar */}
            <div className="contacts-page__avatar-placeholder">
              <img
                src={myPhoto}
                alt="Grigory Nikitenko"
                className="contacts-page__avatar"
                width={400}
                height={400}
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="contacts-page__bio">
            <h2 className="contacts-page__name">Grigoriy Nikitenko</h2>
            <p className="contacts-page__role">Frontend Developer</p>
            <p className="contacts-page__description">
              Frontend developer behind Nice Gadgets — a full-featured
              e-commerce catalog. Built with{' '}
              <strong>React, TypeScript, SCSS (BEM)</strong>, featuring seamless
              routing, adaptive layout, and REST API integration.
            </p>
          </div>
        </div>

        <div className="contacts-page__links-section">
          <h3 className="contacts-page__section-title">Get in touch</h3>

          <div className="contacts-page__links-grid">
            {CONTACT_LINKS.map(({ label, value, href, isExternal }) => (
              <a
                key={label}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="contacts-page__link-card"
              >
                <span className="contacts-page__link-label">{label}</span>
                <span className="contacts-page__link-val">{value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
