import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAvgSendingRates,
  getAvgSendingRatesPerBuildNameAndBuildVer,
  getTextAndValueOfBuildVer,
  getTextAndValueOfBuildName
} from '../redux/selector/MetricSelector';
import SendingRate from '../components/SendingRate';
import SelectedItem from '../components/SelectedItem';
import {
  getBuildVer,
  getBuildName
} from '../redux/actions/MetricsAction';
import { Card } from 'semantic-ui-react';
import Styles from './Styles/styles';
class AverageSendingRate extends Component {
  constructor() {
    super();
    this.handleChangeBuildVer = this.handleChangeBuildVer.bind(this);
    this.handleChangeBuildName = this.handleChangeBuildName.bind(this);
  }
  handleChangeBuildVer(event, {value}) {
    this.props.getBuildVer(value);
  }
  handleChangeBuildName(event, {value}) {
    this.props.getBuildName(value)
  }
  render() {
    return (
      <div>
        <Card.Group>
          <Card style={Styles.cardContainer} fluid>
            <Card.Content header='Average Sending Rate Across all AppID' />
            <SendingRate sendingRates={this.props.avgSendingRates} />
          </Card>
          <Card style={Styles.cardContainer} 
            fluid>
            <Card.Content  header='Average Sending Rate per buildName and buildVer' />
            <SelectedItem 
              selectedSendingRate={this.props.selectedBuildVer} 
              appIds={this.props.buildVers} 
              onChange={this.handleChangeBuildVer}
            />
            <SelectedItem
              selectedSendingRate={this.props.getTextAndValueOfBuildName}
              appIds={this.props.buildNames}
              onChange={this.handleChangeBuildName} 
              />
              <SendingRate
                sendingRates={this.props.avgSendingRatesPerBuildNameAndBuildVer} 
            />
          </Card>          
        </Card.Group>       
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buildVers: getTextAndValueOfBuildVer(state),
    buildNames: getTextAndValueOfBuildName(state), 

    selectedBuildName: state.selectedBuildName,
    selectedBuildVer: state.selectedBuildVer,

    avgSendingRates: getAvgSendingRates(state),
    avgSendingRatesPerBuildNameAndBuildVer: getAvgSendingRatesPerBuildNameAndBuildVer(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBuildVer: (buildVer) => {
      dispatch(getBuildVer(buildVer));
    },
    getBuildName: (buildName) => {
      dispatch(getBuildName(buildName));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AverageSendingRate);