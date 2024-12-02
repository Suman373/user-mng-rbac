import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
   <footer>
    <p>Built by <a style={{color:"blue"}} href="https://github.com/Suman373" target='_blank'>Suman Roy</a></p>
    <p>&copy; {new Date().getFullYear()} StudentDashboard. All Rights Reserved</p>
   </footer>
  )
}

export default Footer;