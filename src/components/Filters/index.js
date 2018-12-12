/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import DatesFilter from './DatesFilter';
import CurrencyFilter from './CurrencyFilter';
import RealTimeFilter from './RealTimeFilter';

const Filters = ({ fetchHistoryData, onRealTime, offRealTime, isRealtime, ...rest }) => (
  <div className="section-filters">
    {!isRealtime && <DatesFilter fetchHistoryData={fetchHistoryData} />}
    <RealTimeFilter onRealTime={onRealTime} offRealTime={offRealTime} />
    <CurrencyFilter {...rest} />
  </div>
);

export default Filters;
