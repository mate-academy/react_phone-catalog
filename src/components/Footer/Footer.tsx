
import React from 'react';
import {Nav} from '../Nav/Nav';
import {Logo} from '../Logo/Logo';
import {LinkType} from '../../interfaces';
import {BackToTop} from '../BackToTop/BackToTop';
import './Footer.scss';


export const Footer = () => {

  const footerLinks: LinkType[] = [
    { title: 'GITHUB', address: 'http://www.github.com', isOuter: true },
    { title: 'CONTACTS', address: '/contacts', isOuter: false },
    { title: 'RIGHTS', address: '/rights', isOuter: false },
  ]

  return(
    <footer className="App__footer Footer">
      <div className="Footer__container">
      <Logo />
      <Nav links={footerLinks} addresses = {[]} />
      <BackToTop />
      </div>



   </footer>
  )
}



