import React from 'react';
import Summary from './Summary';

const Header = props => (
  <div className="header">
    <div className="brand">
      <div className="brand__logo" />
      <div className="brand__title">Bitcoin Rate</div>
    </div>
    <Summary {...props} />
  </div>
);
export default Header;
