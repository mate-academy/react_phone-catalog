
import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const ThanksPage = () => {
  return (
    <div className="ThanksPage">
      <Breadcrumbs />
      <h1 className="ThanksPage__title">Thank You!</h1>
      <p className="ThanksPage__paragraph">
        Thanks for your order. Your purchase will
        be packaged and sent to you shortly.
      </p>
    </div>
  )
}
