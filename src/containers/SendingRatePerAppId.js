import { connect } from 'react-redux';
import React, { Component } from 'react';
import SendingRate from '../components/SendingRate';
import SelectedPerAppID from '../components/SelectedPerAppID';
import {
  getTextAndValueOfAppId,
  getCurrentSendingRates
} from '../redux/selector/MetricSelector'
class SendingRatePerAppIds extends Component {
  render() {
    return (
      <div>
        <SelectedPerAppID 
          selectedSendingRate={this.props.selectedSendingRate} 
          appIds={this.props.appIds} 
        />
        <SendingRate            
          sendingRates={this.props.sendingRates}
        />
      </div>
      
    )
  }
};
const mapStateToProps = state => {
  return {
    appIds: getTextAndValueOfAppId(state),
    sendingRates: getCurrentSendingRates(state),
    selectedSendingRate: state.selectedSendingRate
  }
}
export default connect(mapStateToProps)(SendingRatePerAppIds);


