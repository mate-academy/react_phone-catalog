import { Link } from 'react-router-dom';
import React from 'react'

const Footer = () => (
  <section className="footer-bottom-x">
      <div className="footer-size">
      <div className="footer">
        <iframe src="//ntmaker.gfto.ru/newneontext/?image_height=100&image_width=200&image_font_shadow_width=30&image_font_size=30&image_background_color=000000&image_text_color=FF0000&image_font_shadow_color=F7406B&image_url=&image_text=Phone Catalog&image_font_family=CocaCola&" frameborder='no' scrolling='no' width="200" height="100"></iframe>
      </div>
      <div className='footer-list-links'>
        <div>
          <Link className="footer-link" to="/" exact>Home Page</Link> <br/>
          <Link className="footer-link" to="/phones">Phone Catalog</Link>
        </div>
        <div>
          <Link className="footer-link" to="/cart">Cart</Link> <br/>
          <Link className="footer-link" to="/contacts">Contacts</Link>
        </div>
      </div>
    </div>
  </section>
)

export default Footer
