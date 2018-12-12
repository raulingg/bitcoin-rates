const options = {
  defaultRealTimeInterval: 30, // in seconds
  defaultCurrencyCode: 'USD',
  defaultCurrencyOptions: { iso: 'USD', rate: 1 },
  dateFilters: [
    { id: '1h', unit: 'hours', value: 1, interval: '1-mins', isDefault: false },
    { id: '6h', unit: 'hours', value: 6, interval: '5-mins', isDefault: false },
    { id: '12h', unit: 'hours', value: 12, interval: '8-mins' },
    { id: '1d', unit: 'hours', value: 24, interval: '15-mins', isDefault: true },
    { id: '1w', unit: 'days', value: 7, interval: '2-hours', isDefault: false },
    { id: '1m', unit: 'days', value: 30, interval: '1-day', isDefault: false },
    { id: '3m', unit: 'days', value: 90, interval: '1-day', isDefault: false },
  ],
};

export default option => options[option];
