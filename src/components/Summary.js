import React from 'react';

const Summary = ({ currentRate = '', currencyCodeSelected = 'USD', date = new Date() }) => (
  <div className="summary">
    <p className="summary__amount">
      {currentRate} {currencyCodeSelected}
    </p>
    <p className="summary__date">
      {date.toLocaleDateString('en-EN', {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      })}
    </p>
  </div>
);

export default Summary;
