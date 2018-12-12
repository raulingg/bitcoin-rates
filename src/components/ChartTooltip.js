import React from 'react';
import DateFormatter from '../helpers/DateFormatter';

const ChartTooltip = ({ payload, active, currencyCodeSelected }) => {
  if (!active) {
    return null;
  }

  return (
    <div className="chart__tooltip">
      <div className="tooltip__rate">
        {payload[0].value} {currencyCodeSelected}
      </div>
      <p className="tooltip__date">{DateFormatter.format(payload[0].payload.date)}</p>
    </div>
  );
};

export default ChartTooltip;
