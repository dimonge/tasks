import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAvgSendingRates,
  getAvgSendingRatesPerBuildNameAndBuildVer,
  getTextAndValueOfBuildVer,
  getCurrentSendingRates
} from '../redux/selector/MetricSelector';
import SendingRate from '../components/SendingRate';
import SelectedPerAppID from '../components/SelectedPerAppID';
import {
  getBuildVer
} from '../redux/actions/MetricsAction';
class AverageSendingRate extends Component {
  constructor() {
    super();
    this.handleChangeBuildVer = this.handleChangeBuildVer.bind(this);
  }
  handleChangeBuildVer(event, {value}) {
    this.props.getBuildVer(value);
  }
  render() {
    console.log(this.props.buildVers)
    return (
      <div>
        <h2>Average Sending Rate</h2>
        <SendingRate sendingRates={this.props.avgSendingRates} />
        <h2>Average Sending Rate per  buildName,   buildVer </h2>
        <SelectedPerAppID 
          selectedSendingRate={this.props.selectedBuildName} 
          appIds={this.props.buildVers} 
          onChange={this.handleChangeBuildVer}
        />
        <SendingRate sendingRates={this.props.avgSendingRatesPerBuildNameAndBuildVer} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buildVers: getTextAndValueOfBuildVer(state),
    sendingRates: getCurrentSendingRates(state),
    selectedBuildName: state.selectedBuildName,

    avgSendingRates: getAvgSendingRates(state),
    avgSendingRatesPerBuildNameAndBuildVer: getAvgSendingRatesPerBuildNameAndBuildVer(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBuildVer: (buildVer) => {
      dispatch(getBuildVer(buildVer));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AverageSendingRate);