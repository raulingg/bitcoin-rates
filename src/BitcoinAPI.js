import { MoneyFormatter } from './helpers';

export default class BitcoinAPI {
  bitcoinRateURL = 'https://production.api.coindesk.com/v1/currency/BTC/ticker';

  bitcoinHistoryURL = 'https://production.api.coindesk.com/v1/currency/BTC/graph';

  exchangeRateURL = 'https://production.api.coindesk.com/v1/exchangeRates';

  getRealtimeRate = async () => {
    try {
      const promise = fetch(this.bitcoinRateURL);
      const json = await (await promise).json();
      const date = new Date(json.timestamp).getTime();
      const { price: rate } = json.data.currency.BTC.quotes.USD;
      const [realtimeRate] = BitcoinAPI.formatDataForChart([[date, rate]], 'hours');

      return realtimeRate;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getHistoryBy = async ({
    startDate = new Date(),
    endDate = new Date(),
    interval = '15-mins',
    dateFormat = 'days',
  }) => {
    try {
      const url = await `${
        this.bitcoinHistoryURL
      }?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}&interval=${interval}&convert=USD&ohlc=false`;
      const promise = fetch(url);
      const json = await (await promise).json();
      const { chartData } = json.data.graph.BTC.to.USD;

      return BitcoinAPI.formatDataForChart(chartData, dateFormat);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getExchangeRate = async () => {
    try {
      const promise = fetch(this.exchangeRateURL);
      const json = await (await promise).json();
      const {
        data: { rates },
      } = json;

      return rates;
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  /**
   * format (days or hours)
   */
  static formatDataForChart = (data, dateFormat = 'days') =>
    data.map(([date, rate]) => ({
      legend:
        dateFormat === 'hours'
          ? new Date(date).toLocaleTimeString('en-EN', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
            })
          : new Date(date).toLocaleDateString('en-EN', { day: 'numeric', month: 'short' }),
      rate: MoneyFormatter.format(rate),
      date,
    }));
}
