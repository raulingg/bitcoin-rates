import React from 'react';
import config from '../../config';

const CurrencyFilter = ({
  currencyCodeSelected,
  setCurrencyCodeSelected,
  currencies = config('defaultCurrencyOptions'),
}) => (
  <select
    className="currency-filter"
    defaultValue={currencyCodeSelected}
    onChange={e => setCurrencyCodeSelected(e.target.value)}
  >
    {currencies.map(currency => (
      <option value={currency.iso} key={currency.iso}>
        {currency.iso}
      </option>
    ))}
  </select>
);

export default CurrencyFilter;
