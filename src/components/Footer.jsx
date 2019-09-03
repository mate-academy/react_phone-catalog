import { Link } from 'react-router-dom';
import React from 'react'

const Footer = () => (
  <section className="footer-bottom-x">
      <div className="footer-size">
      <div className="footer">
        <iframe src="//ntmaker.gfto.ru/newneontext/?image_height=100&image_width=200&image_font_shadow_width=30&image_font_size=30&image_background_color=000000&image_text_color=FF0000&image_font_shadow_color=F7406B&image_url=&image_text=Phone Catalog&image_font_family=CocaCola&" frameborder='no' scrolling='no' width="200" height="100"></iframe>
      </div>
      <div className='footer-list-links'>
        <Link className="footer-link" to="/" exact>Home Page</Link>
        <Link className="footer-link" to="/phones">Phone Catalog</Link>
        <Link className="footer-link" to="/cart">Cart</Link>
        <Link className="footer-link" to="/contacts">Contacts</Link>
        <p className="footer-text">Created by Alexandr Alexandrov 2019</p>
      </div>
    </div>
  </section>
)

export default Footer
