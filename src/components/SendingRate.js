import React, { Component } from 'react';
import { LineChart, Line, YAxis, Tooltip } from 'recharts';
import {
  SENDING_RATE_KEY
} from '../config/metricsConfig';
import Styles from './Styles/SendingRateStyle';
import { Loader } from 'semantic-ui-react';

export default class SendingRate extends Component {  
  render() {
    const { sendingRates } = this.props;
    if (!sendingRates) {
      <Loader active inline='centered' />
    }
    return (
      <div>
        <LineChart width={800} height={300} data={sendingRates}
          margin={Styles.lineChartStyle}>    
          <YAxis/>
          <Tooltip/>
          <Line type="monotone" dataKey={SENDING_RATE_KEY} stroke="#82ca9d" />          
        </LineChart>
      </div>
    )
  }
}
