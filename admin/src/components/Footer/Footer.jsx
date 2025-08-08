const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-admin">
      <p>© {currentYear} SpiceRoute. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
