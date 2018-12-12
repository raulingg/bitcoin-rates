/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

const RealTimeFilter = ({ onRealTime, offRealTime }) => {
  const onChangeRealTimeFilter = async e => {
    if (e.target.checked) {
      await onRealTime();
    } else {
      await offRealTime();
    }
  };

  return (
    <div className="realtime-filter">
      <input
        id="realtime-filter-input"
        className="toggle toggle--round-flat"
        type="checkbox"
        onChange={onChangeRealTimeFilter}
      />
      <label htmlFor="realtime-filter-input" />
    </div>
  );
};

export default RealTimeFilter;
