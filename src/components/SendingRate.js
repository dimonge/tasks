import React, { Component } from 'react';
import { LineChart, Line, YAxis, Tooltip } from 'recharts';
import {
  sendingRateKey
} from '../config/metricsConfig';
import Styles from './Styles/SendingRateStyle';
import { Loader } from 'semantic-ui-react';
export default class SendingRate extends Component {  
  render() {
    const { sendingRates } = this.props;
    console.log(sendingRates);
    if (!(sendingRates && sendingRates.length)) {
      <Loader active inline='centered' />
    }
    return (
      <div>
        <LineChart width={800} height={300} data={sendingRates}
          margin={Styles.lineChartStyle}>    
          <YAxis/>
          <Tooltip/>
          <Line type="monotone" dataKey={sendingRateKey} stroke="#82ca9d" />          
        </LineChart>
      </div>
    )
    
  }
}
