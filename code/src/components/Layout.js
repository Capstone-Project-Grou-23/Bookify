import React from 'react';
import Navbar from './homepage/Navbar';
import Footer from './homepage/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ flex: '1 0 auto', paddingTop: '20px', paddingBottom: '20px' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
