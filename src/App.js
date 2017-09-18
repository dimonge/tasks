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
   /* if (this.props.isFetching) {
      return <div>loading...</div>;
    }
    */
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
const mapStateToProps = state => {
  return {
    //isFetching: state.isFetchingStats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStatistics: () => {
      dispatch(fetchStatistics())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
