import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectedMediaTypePerAppID from '../components/SelectedMediaTypePerAppID';
import SelectedPerAppID from '../components/SelectedPerAppID';
import {
  getMediaTypePerAppId
} from '../redux/actions/MetricsAction';
import {
  getTextAndValueOfAppId,
  getTotalMediaTypes
} from '../redux/selector/MetricSelector';

class MediaTypePerAppID extends Component {
  constructor(props) {
  	super();
  	this.handleChangeAppId = this.handleChangeAppId.bind(this);

  }
  handleChangeAppId(event, {value}) {
  	console.log(event, value)
  	this.props.getMediaTypePerAppId(value);
  }
  render() {
    return (
      <div>
        <h2>Media Types Per AppIDs</h2>
        <SelectedPerAppID 
          selectedSendingRate={this.props.selectedSendingRate} 
          appIds={this.props.appIds} 
          onChange={this.handleChangeAppId}
        />
        <SelectedMediaTypePerAppID mediaTypes={this.props.mediaTypes}/>
      </div>
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