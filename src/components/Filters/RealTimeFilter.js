/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';

class RealTimeFilter extends PureComponent {
  onChangeRealTimeFilter = async e => {
    const { onRealTime, offRealTime } = this.props;

    if (e.target.checked) {
      await onRealTime();
    } else {
      await offRealTime();
    }
  };

  render() {
    return (
      <div className="realtime-filter">
        <input
          id="realtime-filter-input"
          className="toggle toggle--round-flat"
          type="checkbox"
          onChange={this.onChangeRealTimeFilter}
        />
        <label htmlFor="realtime-filter-input" />
      </div>
    );
  }
}

export default RealTimeFilter;
