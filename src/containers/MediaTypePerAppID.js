import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectedMediaTypePerAppID from '../components/SelectedMediaTypePerAppID';
import SelectedItem from '../components/SelectedItem';
import {
  getMediaTypePerAppId
} from '../redux/actions/MetricsAction';
import {
  getTextAndValueOfAppId,
  getTotalMediaTypes
} from '../redux/selector/MetricSelector';
import { Card } from 'semantic-ui-react';
import Styles from './Styles/styles';

class MediaTypePerAppID extends Component {
  constructor(props) {
  	super();
  	this.handleChangeAppId = this.handleChangeAppId.bind(this);

  }
  handleChangeAppId(event, {value}) {
  	this.props.getMediaTypePerAppId(value);
  }
  render() {
    return (
      <Card 
        style={Styles.cardContainer} 
        fluid>    
        <Card.Content header='Media Types Per AppIDs' />   
        <SelectedItem 
          selectedSendingRate={this.props.selectedSendingRate} 
          appIds={this.props.appIds} 
          onChange={this.handleChangeAppId}
        />
        <SelectedMediaTypePerAppID mediaTypes={this.props.mediaTypes}/>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    appIds: getTextAndValueOfAppId(state),
    selectedSendingRate: state.selectedSendingRate,
    mediaTypes: getTotalMediaTypes(state)
  }
}

const mapDispatchToProps = dispatch => {
	return {
		getMediaTypePerAppId: (appID) => {
			dispatch(getMediaTypePerAppId(appID))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MediaTypePerAppID);