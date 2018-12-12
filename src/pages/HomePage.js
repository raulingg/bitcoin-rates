import React, { Component } from 'react';
import moment from 'moment';
import { MoneyFormatter } from '../helpers';
import { Header, Filters, Chart } from '../components';
import config from '../config';

const defaultDateFilter = config('dateFilters').find(dateFilter => dateFilter.isDefault);

class HomePage extends Component {
  state = {
    chartData: [],
    currenciesData: [config('defaultCurrencyOptions')],
    currencyCodeSelected: config('defaultCurrencyCode'),
    isRealtime: false,
    isLoading: true,
  };

  intervalRealtime = undefined;

  async componentDidMount() {
    const { bitcoinAPI } = this.props;
    const { interval, unit, value } = defaultDateFilter;
    const startDate = moment()
      .subtract(value, unit)
      .toDate();
    const endDate = new Date();

    const [currenciesData, chartData] = await Promise.all([
      bitcoinAPI.getExchangeRate(),
      bitcoinAPI.getHistoryBy({ startDate, endDate, interval, dateFormat: unit }),
    ]);

    this.setState(() => ({ chartData, currenciesData, isLoading: false }));
  }

  async componentWillUnmount() {
    const { isRealtime } = this.state;

    if (isRealtime) {
      clearInterval(this.intervalRealtime);
    }
  }

  fetchHistoryData = async args => {
    const { bitcoinAPI } = this.props;
    const { currencyCodeSelected } = this.state;

    const chartData = await bitcoinAPI.getHistoryBy({ ...args });

    if (currencyCodeSelected !== config('defaultCurrencyCode')) {
      chartData.forEach((charItem, index) => {
        chartData[index].rate = this.exchangeRate(charItem.rate, currencyCodeSelected);
      });
    }

    this.setState({ chartData });
  };

  getRealtimeData = async () => {
    const { bitcoinAPI } = this.props;
    const { currencyCodeSelected } = this.state;

    const realtimeRate = await bitcoinAPI.getRealtimeRate();

    if (currencyCodeSelected === config('defaultCurrencyCode')) {
      return realtimeRate;
    }

    realtimeRate.rate = this.exchangeRate(realtimeRate.rate, currencyCodeSelected);

    return realtimeRate;
  };

  onRealTime = async () => {
    const { isRealtime } = this.state;

    if (isRealtime) {
      return;
    }

    const realtimeRate = await this.getRealtimeData();
    this.setState({ chartData: [realtimeRate], isRealtime: true });

    this.intervalRealtime = setInterval(async () => {
      const data = await this.getRealtimeData();
      this.setState(state => ({ chartData: [...state.chartData, data] }));
    }, config('defaultRealTimeInterval') * 1000);
  };

  offRealTime = async () => {
    const { isRealtime, currencyCodeSelected } = this.state;

    if (!isRealtime) {
      return;
    }

    clearInterval(this.intervalRealtime);
    this.setState(() => ({ isLoading: true }));

    const { bitcoinAPI } = this.props;
    const { interval, unit, value } = defaultDateFilter;
    const startDate = moment()
      .subtract(value, unit)
      .toDate();
    const endDate = new Date();
    const chartData = await bitcoinAPI.getHistoryBy({
      startDate,
      endDate,
      interval,
      dateFormat: unit,
    });

    if (currencyCodeSelected !== config('defaultCurrencyCode')) {
      chartData.forEach((charItem, index) => {
        chartData[index].rate = this.exchangeRate(charItem.rate, currencyCodeSelected);
      });
    }

    this.setState({ chartData, isLoading: false, isRealtime: false });
  };

  setCurrencyCodeSelected = newValue => {
    const { currencyCodeSelected, chartData } = this.state;

    chartData.forEach((charItem, index) => {
      chartData[index].rate = this.exchangeRate(charItem.rate, newValue, currencyCodeSelected);
    });

    this.setState({ currencyCodeSelected: newValue, chartData });
  };

  exchangeRate = (
    rateForExchanging,
    currencyCodeTo,
    currencyCodeFrom = config('defaultCurrencyCode')
  ) => {
    const { currenciesData } = this.state;
    const currencyTo = currenciesData.find(currency => currency.iso === currencyCodeTo);
    const currencyFrom = currenciesData.find(currency => currency.iso === currencyCodeFrom);
    const newRate = currencyTo.rate * (rateForExchanging / currencyFrom.rate);

    return MoneyFormatter.format(newRate);
  };

  render() {
    const { chartData, currencyCodeSelected, currenciesData, isLoading, isRealtime } = this.state;
    const chartDataSize = chartData.length;
    const currentRate = chartDataSize ? chartData[chartDataSize - 1].rate : '';

    return isLoading ? (
      <div className="loader" />
    ) : (
      <div className="container">
        <Header currentRate={currentRate} currencyCodeSelected={currencyCodeSelected} />
        <Filters
          currencyCodeSelected={currencyCodeSelected}
          setCurrencyCodeSelected={this.setCurrencyCodeSelected}
          currencies={currenciesData}
          fetchHistoryData={this.fetchHistoryData}
          isRealtime={isRealtime}
          onRealTime={this.onRealTime}
          offRealTime={this.offRealTime}
        />
        <Chart data={chartData} currencyCodeSelected={currencyCodeSelected} />
      </div>
    );
  }
}

export default HomePage;
