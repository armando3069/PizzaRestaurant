import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <div className='footer'>
      <ul className='line1'>
        <li>Info</li>
        <li>Support</li>
        <li>Marketing</li>
      </ul>
      <ul className='line2'>
        <li>Terms of Use</li>
        <li>Privacy Policy</li>
      </ul>
      <p className='context'>copyright 2024 @</p>
    </div>
  );
}

export default Footer;