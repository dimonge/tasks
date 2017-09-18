import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
  fetchStatistics
} from './redux/actions/MetricsAction';
import SendingRatePerAppId from './containers/SendingRatePerAppId';
import AvgSendingRate from './containers/AvgSendingRate';
import MediaTypePerAppID from './containers/MediaTypePerAppID';

class App extends Component {  
  getStyles() {

    return {
      title: {
        fontSize: '1.2rem'
      }
    }
  }

  componentWillMount() {
    this.props.fetchStatistics();
  }
  
  render() {
    let styles = this.getStyles();
    return (
      <div>
        <div style={styles.title}>          
          <h2>CallStats</h2>
        </div>
        <SendingRatePerAppId />
        <AvgSendingRate />
        <MediaTypePerAppID />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchStatistics: () => {
      dispatch(fetchStatistics())
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
