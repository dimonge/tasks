import { connect } from 'react-redux';
import React, { Component } from 'react';
import SendingRate from '../components/SendingRate';
import SelectedItem from '../components/SelectedItem';
import {
  getSendingRatePerAppId
} from '../redux/actions/MetricsAction';
import {
  getTextAndValueOfAppId,
  getCurrentSendingRates
} from '../redux/selector/MetricSelector';
import { Card } from 'semantic-ui-react';
import Styles from './Styles/styles';
class SendingRatePerAppIds extends Component {
  constructor(props) {
    super(props);
    this.handleChangeAppId = this.handleChangeAppId.bind(this);
  }
  handleChangeAppId(e, {value}) {
    this.props.getSendingRatePerAppId(value)
  }
  render() {
    return (
      <Card 
        style={Styles.cardContainer}
        fluid>
        <Card.Content header='Sending rate per AppID' />
        <SelectedItem 
          selectedSendingRate={this.props.selectedSendingRate} 
          appIds={this.props.appIds} 
          onChange={this.handleChangeAppId}
        />
        <SendingRate            
          sendingRates={this.props.sendingRates}
        />
      </Card>        
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

const mapDispatchToProps = dispatch => {
  return {
    getSendingRatePerAppId: (appID) => {
      dispatch(getSendingRatePerAppId(appID));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SendingRatePerAppIds);


