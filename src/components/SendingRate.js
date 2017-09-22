import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, YAxis, Tooltip } from 'recharts';
import {
  SENDING_RATE_KEY
} from '../config/metricsConfig';
import Styles from './Styles/SendingRateStyle';
import LoadingIndicator from './LoadingIndicator';

export default class SendingRate extends Component {  
  render() {
    const { sendingRates } = this.props;
    if (!sendingRates) {
      return <LoadingIndicator />
    } else {
      return (
        <LineChart width={800} height={300} data={sendingRates}
          margin={Styles.lineChartStyle}>    
          <YAxis/>
          <Tooltip/>
          <Line type="monotone" dataKey={SENDING_RATE_KEY} stroke="#82ca9d" />          
        </LineChart>
      )
    }
    
  }
}

SendingRate.propTypes = {
  sendingRates: PropTypes.arrayOf(PropTypes.object)
}