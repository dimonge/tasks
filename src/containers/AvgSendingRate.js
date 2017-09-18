import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAvgSendingRates,
  getAvgSendingRatesPerBuildNameAndBuildVer
} from '../redux/selector/MetricSelector';
import SendingRate from '../components/SendingRate';

class AverageSendingRate extends Component {
  render() {
    return (
      <div>
        <h2>Average Sending Rate</h2>
        <SendingRate sendingRates={this.props.avgSendingRates} />
        <h2>Average Sending Rate per  buildName,   buildVer </h2>

        <SendingRate sendingRates={this.props.avgSendingRatesPerBuildNameAndBuildVer} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avgSendingRates: getAvgSendingRates(state),
    avgSendingRatesPerBuildNameAndBuildVer: getAvgSendingRatesPerBuildNameAndBuildVer(state)
  }
}

export default connect(mapStateToProps)(AverageSendingRate);