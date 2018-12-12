import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const Chart = ({ data, currencyCodeSelected }) => (
  <div className="chart">
    {data && (
      <ResponsiveContainer width="90%" height="90%" className="chart__content">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line dataKey="rate" stroke="#1c88bf" dot={false} />
          <CartesianGrid stroke="#666" strokeDasharray="5 5" />
          <XAxis dataKey="legend" padding={{ left: 0, right: 0 }} />
          <YAxis dataKey="rate" domain={['auto', 'auto']} padding={{ top: 0, bottom: 20 }} />
          <Tooltip content={<ChartTooltip currencyCodeSelected={currencyCodeSelected} />} />
        </LineChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default Chart;
