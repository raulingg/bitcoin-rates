import React, { Component } from 'react';
import moment from 'moment';
import config from '../../config';

const dateFilters = config('dateFilters');
const defaultDateFilterId = dateFilters.find(dateFilter => dateFilter.isDefault).id;

class DatesFilter extends Component {
  state = {
    dateFilterIdSelected: defaultDateFilterId,
  };

  onDateFilterSelected = async e => {
    const dateFilterIdSelected = e.target.id;
    this.setState({ dateFilterIdSelected });

    const dateFilterSelected = dateFilters.find(
      dateFilter => dateFilter.id === dateFilterIdSelected
    );
    const startDate = moment()
      .subtract(dateFilterSelected.value, dateFilterSelected.unit)
      .toDate();
    const { fetchHistoryData } = this.props;

    await fetchHistoryData({
      startDate,
      endDate: new Date(),
      interval: dateFilterSelected.interval,
      dateFormat: dateFilterSelected.unit,
    });
  };

  render() {
    const { dateFilterIdSelected } = this.state;

    return (
      <div className="dates-filters">
        {dateFilters.map(dateFilter => (
          <button
            key={dateFilter.id}
            id={dateFilter.id}
            className={
              dateFilterIdSelected === dateFilter.id
                ? 'dates-filters__item dates-filters__item--active'
                : 'dates-filters__item'
            }
            onClick={this.onDateFilterSelected}
          >
            {dateFilter.id}
          </button>
        ))}
      </div>
    );
  }
}

export default DatesFilter;
