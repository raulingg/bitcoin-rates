import React, { PureComponent } from 'react';
import config from '../../config';

class CurrencyFilter extends PureComponent {
  render() {
    const {
      currencyCodeSelected,
      setCurrencyCodeSelected,
      currencies = config('defaultCurrencyOptions'),
    } = this.props;

    return (
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
  }
}

export default CurrencyFilter;
